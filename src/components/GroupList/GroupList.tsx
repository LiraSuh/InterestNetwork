import React from 'react';
import { Group, Person } from '../../types';
import './GroupList.css';

interface GroupListProps {
  groups: Group[];
  persons: Person[];
  onGroupClick: (group: Group) => void;
  onCreateGroup: () => void;
}

const GroupList: React.FC<GroupListProps> = ({
  groups,
  persons,
  onGroupClick,
  onCreateGroup
}) => {
  return (
    <div className="group-list">
      <div className="group-list-header">
        <h2>Groups</h2>
        <button className="add-button" onClick={onCreateGroup}>
          Add
        </button>
      </div>
      <div className="group-grid">
        {groups.map((group) => (
          <div
            key={group.id}
            className="group-card"
            onClick={() => onGroupClick(group)}
          >
            <h3>{group.name}</h3>
            <p>{group.description}</p>
            <div className="group-members">
              {(group.personIds || []).map((personId) => {
                const person = persons.find((p) => p.id === personId);
                return person ? (
                  <div key={personId} className="group-member">
                    {person.name}
                  </div>
                ) : null;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupList; 