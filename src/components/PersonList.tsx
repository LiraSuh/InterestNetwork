import React, { useState } from 'react';
import { Person } from '../types';
import './PersonList.css';

export interface PersonListProps {
  persons: Person[];
  onDelete: (id: string) => void;
  onPersonClick?: (person: Person) => void;
  onEditPerson: (person: Person) => void;
}

export function PersonList({ persons, onDelete, onPersonClick, onEditPerson }: PersonListProps): React.ReactElement {
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [editForm, setEditForm] = useState<Partial<Person>>({});

  const handleEditClick = (e: React.MouseEvent, person: Person) => {
    e.stopPropagation();
    setEditingPerson(person);
    setEditForm({
      name: person.name,
      affiliation: person.affiliation,
      field: person.field,
      notes: person.notes
    });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPerson && editingPerson.id) {
      onEditPerson({
        ...editingPerson,
        ...editForm
      });
      setEditingPerson(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingPerson(null);
  };

  if (persons.length === 0) {
    return <p className="empty-message">No contacts added yet.</p>;
  }

  return (
    <div className="person-list">
      {persons.map(person => (
        <div key={person.id} className="person-card" onClick={() => onPersonClick?.(person)}>
          {editingPerson?.id === person.id ? (
            <form onSubmit={handleSaveEdit} className="edit-form">
              <div className="image-upload-container">
                <div className="image-preview">
                  {editForm.profileImage ? (
                    <img src={editForm.profileImage} alt="Profile preview" />
                  ) : (
                    <div className="image-placeholder">
                      <span>👤</span>
                    </div>
                  )}
                </div>
                <label className="image-upload-button">
                  Change Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setEditForm(prev => ({
                            ...prev,
                            profileImage: reader.result as string
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
              <input
                type="text"
                value={editForm.name || ''}
                onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                placeholder="Name"
                required
              />
              <input
                type="text"
                value={editForm.affiliation || ''}
                onChange={e => setEditForm({ ...editForm, affiliation: e.target.value })}
                placeholder="Affiliation"
              />
              <input
                type="text"
                value={editForm.field || ''}
                onChange={e => setEditForm({ ...editForm, field: e.target.value })}
                placeholder="Research Field"
              />
              <textarea
                value={editForm.notes || ''}
                onChange={e => setEditForm({ ...editForm, notes: e.target.value })}
                placeholder="Notes"
              />
              <div className="edit-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelEdit}>Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <div className="person-avatar">
                {person.profileImage ? (
                  <img src={person.profileImage} alt={person.name} />
                ) : (
                  <div className="avatar-placeholder">
                    {person.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <h3>{person.name}</h3>
              {person.affiliation && (
                <p><strong>Affiliation:</strong> {person.affiliation}</p>
              )}
              {person.field && (
                <p><strong>Research Field:</strong> {person.field}</p>
              )}
              {person.notes && (
                <p><strong>Notes:</strong> {person.notes}</p>
              )}
              <div className="person-actions">
                <button 
                  className="edit-button"
                  onClick={(e) => handleEditClick(e, person)}
                >
                  Edit
                </button>
                <button 
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    person.id && onDelete(person.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
} 