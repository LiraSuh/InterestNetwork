import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { PersonList } from './components/PersonList';
import { AddPersonModal } from './components/AddPersonModal';
import { GroupList } from './components/Groups/GroupList';
import { GroupDetail } from './components/Groups/GroupDetail';
import AddGroupModal from './components/Groups/AddGroupModal';
import { AddToGroupModal } from './components/Groups/AddToGroupModal';
import Interests from './components/Interests/Interests';
import { Recommendations } from './components/Recommendations/Recommendations';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { Person, Group, Interest } from './types';
import { sampleExperts } from './data/sampleExperts';
import './App.css';
import EditGroupModal from './components/Groups/EditGroupModal';
import { ArticleRecommendations } from './components/Articles/ArticleRecommendations';

type Tab = 'interests' | 'recommendations' | 'groups' | 'network' | 'articles';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [persons, setPersons] = useState<Person[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [availableExperts, setAvailableExperts] = useState<Person[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isAddToGroupModalOpen, setIsAddToGroupModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('interests');
  const [favoriteExperts, setFavoriteExperts] = useState<Set<string>>(new Set());
  const [isEditGroupModalOpen, setIsEditGroupModalOpen] = useState(false);
  const [selectedGroupForEdit, setSelectedGroupForEdit] = useState<Group | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        // Fetch persons
        const personsQuery = query(collection(db, 'persons'), where('userId', '==', user.uid));
        const personsSnapshot = await getDocs(personsQuery);
        const personsData = personsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Person[];
        setPersons(personsData);

        // Fetch groups
        const groupsQuery = query(collection(db, 'groups'), where('userId', '==', user.uid));
        const groupsSnapshot = await getDocs(groupsQuery);
        const groupsData = groupsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Group[];
        setGroups(groupsData);

        // Fetch interests
        const interestsQuery = query(collection(db, 'interests'), where('userId', '==', user.uid));
        const interestsSnapshot = await getDocs(interestsQuery);
        const interestsData = interestsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Interest[];
        setInterests(interestsData);

        // Set available experts (excluding already added persons)
        const addedExpertIds = new Set(personsData.map(p => p.id));
        const availableExpertsData = sampleExperts.filter(expert => !addedExpertIds.has(expert.id));
        console.log('Available Experts:', availableExpertsData);
        setAvailableExperts(availableExpertsData);
      };

      fetchData();
    } else {
      setPersons([]);
      setGroups([]);
      setInterests([]);
      setAvailableExperts([]);
    }
  }, [user]);

  const addPerson = async (newPerson: Person) => {
    if (!user) return;

    try {
      const docRef = await addDoc(collection(db, 'persons'), {
        ...newPerson,
        userId: user.uid,
        createdAt: new Date()
      });
      
      setPersons([...persons, { id: docRef.id, ...newPerson }]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding person:', error);
    }
  };

  const addGroup = async (newGroup: Omit<Group, 'id' | 'userId' | 'createdAt' | 'personIds'>) => {
    if (!user) return;

    try {
      const docRef = await addDoc(collection(db, 'groups'), {
        ...newGroup,
        userId: user.uid,
        createdAt: new Date(),
        personIds: []
      });
      
      setGroups([...groups, { id: docRef.id, ...newGroup, personIds: [] }]);
      setIsGroupModalOpen(false);
    } catch (error) {
      console.error('Error adding group:', error);
    }
  };

  const deletePerson = async (personId: string) => {
    try {
      await deleteDoc(doc(db, 'persons', personId));
      setPersons(persons.filter(person => person.id !== personId));
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  const addInterest = async (newInterest: Omit<Interest, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return;

    try {
      const docRef = await addDoc(collection(db, 'interests'), {
        ...newInterest,
        userId: user.uid,
        createdAt: new Date()
      });
      
      setInterests([...interests, { id: docRef.id, ...newInterest }]);
      
      // Update available experts based on new interest
      const updatedExperts = sampleExperts.filter(expert => {
        const isExpertiseMatch = expert.expertise?.some(exp => 
          exp.toLowerCase().includes(newInterest.name.toLowerCase())
        );
        const isFieldMatch = expert.field.toLowerCase().includes(newInterest.name.toLowerCase());
        const isAffiliationMatch = expert.affiliation.toLowerCase().includes(newInterest.name.toLowerCase());
        const isCategoryMatch = expert.expertise?.some(exp => 
          exp.toLowerCase().includes(newInterest.category.toLowerCase())
        );
        
        return isExpertiseMatch || isFieldMatch || isAffiliationMatch || isCategoryMatch;
      });

      // Remove experts that are already in the network
      const addedExpertIds = new Set(persons.map(p => p.id));
      const filteredExperts = updatedExperts.filter(expert => !addedExpertIds.has(expert.id));
      
      setAvailableExperts(filteredExperts);
    } catch (error) {
      console.error('Error adding interest:', error);
    }
  };

  const deleteInterest = async (interestId: string) => {
    try {
      await deleteDoc(doc(db, 'interests', interestId));
      setInterests(interests.filter(interest => interest.id !== interestId));
    } catch (error) {
      console.error('Error deleting interest:', error);
    }
  };

  const handlePersonClick = (person: Person) => {
    setSelectedPerson(person);
    setIsAddToGroupModalOpen(true);
  };

  const handleAddToGroup = async (personId: string, groupId: string) => {
    if (!selectedPerson?.id || !groupId) return;

    try {
      // Update person's groups
      const personRef = doc(db, 'persons', personId);
      const updatedGroupIds = [...(selectedPerson.groupIds || []), groupId];
      await updateDoc(personRef, { groupIds: updatedGroupIds });

      // Update group's persons
      const groupRef = doc(db, 'groups', groupId);
      const group = groups.find(g => g.id === groupId);
      const updatedPersonIds = [...(group?.personIds || []), personId];
      await updateDoc(groupRef, { personIds: updatedPersonIds });

      // Update local state
      setPersons(persons.map(p => 
        p.id === personId 
          ? { ...p, groupIds: updatedGroupIds }
          : p
      ));
      setGroups(groups.map(g => 
        g.id === groupId 
          ? { ...g, personIds: updatedPersonIds }
          : g
      ));

      setIsAddToGroupModalOpen(false);
      setSelectedPerson(null);
    } catch (error) {
      console.error('Error adding person to group:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleEditPerson = async (updatedPerson: Person) => {
    if (!updatedPerson.id) return;

    try {
      const personRef = doc(db, 'persons', updatedPerson.id);
      await updateDoc(personRef, {
        name: updatedPerson.name,
        affiliation: updatedPerson.affiliation,
        field: updatedPerson.field,
        notes: updatedPerson.notes
      });

      setPersons(persons.map(p => 
        p.id === updatedPerson.id ? updatedPerson : p
      ));
    } catch (error) {
      console.error('Error updating person:', error);
    }
  };

  const handleRemoveFromGroup = async (personId: string, groupId: string) => {
    try {
      // Update person's groups
      const personRef = doc(db, 'persons', personId);
      const person = persons.find(p => p.id === personId);
      const updatedGroupIds = person?.groupIds?.filter(id => id !== groupId) ?? [];
      await updateDoc(personRef, { groupIds: updatedGroupIds });

      // Update group's persons
      const groupRef = doc(db, 'groups', groupId);
      const group = groups.find(g => g.id === groupId);
      const updatedPersonIds = group?.personIds?.filter(id => id !== personId) ?? [];
      await updateDoc(groupRef, { personIds: updatedPersonIds });

      // Update local state
      setPersons(persons.map(p => 
        p.id === personId 
          ? { ...p, groupIds: updatedGroupIds }
          : p
      ));
      setGroups(groups.map(g => 
        g.id === groupId 
          ? { ...g, personIds: updatedPersonIds }
          : g
      ));
    } catch (error) {
      console.error('Error removing person from group:', error);
    }
  };

  const handleAddToNetwork = async (person: Person) => {
    if (!user) return;

    try {
      // Create a new person object with user-specific data
      const newPerson = {
        ...person,
        userId: user.uid,
        createdAt: new Date(),
        groupIds: [],
        isFavorite: favoriteExperts.has(person.id || '')
      };

      // Add to Firestore
      const docRef = await addDoc(collection(db, 'persons'), newPerson);
      
      // Update local state
      setPersons(prev => [...prev, { ...newPerson, id: docRef.id }]);
      
      // Remove from available experts
      setAvailableExperts(prev => prev.filter(expert => expert.id !== person.id));

      // Show success message
      alert(`${person.name} has been added to your network!`);
    } catch (error) {
      console.error('Error adding person to network:', error);
      alert('Failed to add person to network. Please try again.');
    }
  };

  const handleToggleFavorite = (personId: string) => {
    setFavoriteExperts(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(personId)) {
        newFavorites.delete(personId);
      } else {
        newFavorites.add(personId);
      }
      return newFavorites;
    });
  };

  const getAvailableExperts = () => {
    return sampleExperts
      .filter(expert => !persons.some(p => p.id === expert.id))
      .map(expert => ({
        ...expert,
        isFavorite: favoriteExperts.has(expert.id)
      }));
  };

  const handleEditGroup = (group: Group) => {
    setSelectedGroupForEdit(group);
    setIsEditGroupModalOpen(true);
  };

  const handleUpdateGroup = async (updatedGroup: Group) => {
    if (!updatedGroup.id) return;

    try {
      const groupRef = doc(db, 'groups', updatedGroup.id);
      await updateDoc(groupRef, {
        name: updatedGroup.name,
        description: updatedGroup.description
      });

      setGroups(groups.map(g => 
        g.id === updatedGroup.id ? updatedGroup : g
      ));
      setIsEditGroupModalOpen(false);
      setSelectedGroupForEdit(null);
    } catch (error) {
      console.error('Error updating group:', error);
    }
  };

  const handleDeleteGroup = async (groupId: string) => {
    try {
      await deleteDoc(doc(db, 'groups', groupId));
      setGroups(groups.filter(g => g.id !== groupId));
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return isRegistering ? (
      <Register onLoginClick={() => setIsRegistering(false)} />
    ) : (
      <Login onRegisterClick={() => setIsRegistering(true)} />
    );
  }

  if (selectedGroup) {
    return (
      <GroupDetail
        group={selectedGroup}
        persons={persons}
        onBack={() => setSelectedGroup(null)}
        onPersonClick={handlePersonClick}
        onRemoveFromGroup={handleRemoveFromGroup}
      />
    );
  }

  return (
    <div className="app">
      <header>
        <h1>Research Contacts</h1>
        <div className="header-buttons">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'interests' ? 'active' : ''}`}
          onClick={() => setActiveTab('interests')}
        >
          Interests
        </button>
        <button
          className={`tab-button ${activeTab === 'recommendations' ? 'active' : ''}`}
          onClick={() => setActiveTab('recommendations')}
        >
          Recommended Experts
        </button>
        <button
          className={`tab-button ${activeTab === 'groups' ? 'active' : ''}`}
          onClick={() => setActiveTab('groups')}
        >
          Groups
        </button>
        <button
          className={`tab-button ${activeTab === 'network' ? 'active' : ''}`}
          onClick={() => setActiveTab('network')}
        >
          Network
        </button>
        <button
          className={`tab-button ${activeTab === 'articles' ? 'active' : ''}`}
          onClick={() => setActiveTab('articles')}
        >
          Articles
        </button>
      </div>

      {activeTab === 'interests' ? (
        <Interests
          interests={interests}
          onAddInterest={addInterest}
          onDeleteInterest={deleteInterest}
        />
      ) : activeTab === 'recommendations' ? (
        <Recommendations
          interests={interests}
          persons={getAvailableExperts()}
          onAddToNetwork={handleAddToNetwork}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : activeTab === 'groups' ? (
        <div className="groups-container">
          <div className="groups-header">
            <h2>Groups</h2>
            <button className="add-button" onClick={() => setIsGroupModalOpen(true)}>
              Add Group
            </button>
          </div>
          <GroupList
            groups={groups}
            persons={persons}
            onGroupClick={setSelectedGroup}
            onEditGroup={handleEditGroup}
            onDeleteGroup={handleDeleteGroup}
          />
        </div>
      ) : activeTab === 'network' ? (
        <div className="network-container">
          <div className="network-header">
            <h2>Network</h2>
            <button className="add-button" onClick={() => setIsModalOpen(true)}>
              Add Contact
            </button>
          </div>
          <PersonList
            persons={persons}
            onDelete={deletePerson}
            onPersonClick={handlePersonClick}
            onEditPerson={handleEditPerson}
          />
        </div>
      ) : activeTab === 'articles' ? (
        <ArticleRecommendations interests={interests} />
      ) : null}

      {isModalOpen && (
        <AddPersonModal 
          onClose={() => setIsModalOpen(false)}
          onAdd={addPerson}
        />
      )}

      {isGroupModalOpen && (
        <AddGroupModal
          onClose={() => setIsGroupModalOpen(false)}
          onAdd={addGroup}
        />
      )}

      {isAddToGroupModalOpen && selectedPerson && (
        <AddToGroupModal
          person={selectedPerson}
          groups={groups}
          onClose={() => setSelectedPerson(null)}
          onAddToGroup={(groupId) => {
            if (selectedPerson.id) {
              handleAddToGroup(selectedPerson.id, groupId);
            }
            setSelectedPerson(null);
          }}
        />
      )}

      {isEditGroupModalOpen && selectedGroupForEdit && (
        <EditGroupModal
          group={selectedGroupForEdit}
          onClose={() => {
            setIsEditGroupModalOpen(false);
            setSelectedGroupForEdit(null);
          }}
          onSave={handleUpdateGroup}
        />
      )}
    </div>
  );
}

export default App; 