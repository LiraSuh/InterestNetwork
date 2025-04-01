import React from 'react';
import { Group, Person } from '../../types';
import './Groups.css';

interface GroupListProps {
  groups: Group[];
  persons: Person[];
  onGroupClick: (group: Group) => void;
  onEditGroup: (group: Group) => void;
  onDeleteGroup: (groupId: string) => void;
}

export const GroupList: React.FC<GroupListProps> = ({
  groups,
  persons,
  onGroupClick,
  onEditGroup,
  onDeleteGroup
}) => {
  const getGroupMembers = (group: Group) => {
    return persons.filter(person => person.groupIds?.includes(group.id || ''));
  };

  const handleEditClick = (e: React.MouseEvent, group: Group) => {
    e.stopPropagation();
    onEditGroup(group);
  };

  const handleDeleteClick = (e: React.MouseEvent, groupId: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this group?')) {
      onDeleteGroup(groupId);
    }
  };

  if (groups.length === 0) {
    return (
      <div className="groups-container">
        <p className="empty-message">No groups created yet.</p>
      </div>
    );
  }

  return (
    <div className="groups-grid">
      {groups.map(group => (
        <div
          key={group.id}
          className="group-card"
          onClick={() => onGroupClick(group)}
        >
          <div className="group-header">
            <h3>{group.name}</h3>
            <div className="group-actions">
              <button 
                className="edit-button"
                onClick={(e) => handleEditClick(e, group)}
              >
                Edit
              </button>
              <button 
                className="delete-button"
                onClick={(e) => handleDeleteClick(e, group.id || '')}
              >
                Delete
              </button>
            </div>
          </div>
          <p className="group-description">{group.description}</p>
          <div className="group-members">
            <span className="member-count">
              {group.personIds?.length || 0} members
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

