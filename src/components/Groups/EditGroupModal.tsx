import React, { useState, useEffect } from 'react';
import { Group } from '../../types';
import './Groups.css';

interface EditGroupModalProps {
  group: Group;
  onClose: () => void;
  onSave: (updatedGroup: Group) => void;
}

const EditGroupModal: React.FC<EditGroupModalProps> = ({
  group,
  onClose,
  onSave
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(group.name);
    setDescription(group.description || '');
  }, [group]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...group,
      name,
      description
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Group</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
          <div className="modal-buttons">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGroupModal; 