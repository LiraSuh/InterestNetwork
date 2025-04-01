import React from 'react';
import { Person, Group } from '../../types';

export interface AddToGroupModalProps {
  person: Person;
  groups: Group[];
  onClose: () => void;
  onAddToGroup: (groupId: string) => void;
}

export function AddToGroupModal({ person, groups, onClose, onAddToGroup }: AddToGroupModalProps): React.ReactElement {
  const availableGroups = groups.filter(group => 
    !person.groupIds?.includes(group.id || '')
  );

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add {person.name} to a Group</h2>
        <div className="groups-list">
          {availableGroups.length === 0 ? (
            <p>No available groups to add to.</p>
          ) : (
            availableGroups.map(group => (
              <div
                key={group.id}
                className="group-item"
                onClick={() => group.id && onAddToGroup(group.id)}
              >
                <h3>{group.name}</h3>
                {group.description && <p>{group.description}</p>}
              </div>
            ))
          )}
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
} 