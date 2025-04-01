import React, { useState } from 'react';
import { Group } from '../../types';
import './Groups.css';

interface AddGroupModalProps {
  onClose: () => void;
  onAdd: (group: Omit<Group, 'id' | 'userId' | 'createdAt' | 'personIds'>) => void;
}

function AddGroupModal({ onClose, onAdd }: AddGroupModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create New Group</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Group Name *</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter group name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter group description"
              rows={3}
            />
          </div>
          <div className="button-group">
            <button type="submit">Create Group</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddGroupModal; 