import React from 'react';
import { Group, Person } from '../../types';
import './Groups.css';

interface GroupDetailProps {
  group: Group;
  persons: Person[];
  onBack: () => void;
  onPersonClick: (person: Person) => void;
  onRemoveFromGroup: (personId: string, groupId: string) => void;
}

export function GroupDetail({ 
  group, 
  persons, 
  onBack, 
  onPersonClick,
  onRemoveFromGroup 
}: GroupDetailProps): React.ReactElement {
  const groupPersons = persons.filter(person => 
    person.groupIds?.includes(group.id || '')
  );

  return (
    <div className="group-detail">
      <div className="group-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h2>{group.name}</h2>
        {group.description && <p className="group-description">{group.description}</p>}
      </div>

      <div className="group-members">
        <h3>Members ({groupPersons.length})</h3>
        {groupPersons.length === 0 ? (
          <p className="no-members">No members in this group.</p>
        ) : (
          <div className="members-grid">
            {groupPersons.map(person => (
              <div key={person.id} className="member-card">
                <div className="member-avatar">
                  {person.profileImage ? (
                    <img src={person.profileImage} alt={person.name} />
                  ) : (
                    <div className="avatar-placeholder">
                      {person.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="member-info" onClick={() => onPersonClick(person)}>
                  <h4>{person.name}</h4>
                  <p className="member-affiliation">{person.affiliation}</p>
                  <p className="member-field">{person.field}</p>
                </div>
                <button 
                  className="remove-button"
                  onClick={() => person.id && group.id && onRemoveFromGroup(person.id, group.id)}
                >
                  Remove from Group
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

