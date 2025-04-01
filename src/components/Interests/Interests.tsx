import React, { useState } from 'react';
import { Interest, InterestCategory } from '../../types';
import './Interests.css';

interface InterestsProps {
  interests: Interest[];
  onAddInterest: (interest: Interest) => void;
  onDeleteInterest: (id: string) => void;
}

const defaultCategories: InterestCategory[] = [
  'career',
  'management',
  'marketing',
  'advertising',
  'journalism',
  'sports',
  'entertainment',
  'custom'
];

const Interests: React.FC<InterestsProps> = ({ interests, onAddInterest, onDeleteInterest }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInterest, setNewInterest] = useState<Partial<Interest>>({
    name: '',
    category: 'career'
  });
  const [customCategory, setCustomCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInterest.name) return;

    const interest: Interest = {
      id: Date.now().toString(),
      name: newInterest.name,
      category: newInterest.category as InterestCategory,
      createdAt: new Date().toISOString()
    };

    onAddInterest(interest);
    setIsModalOpen(false);
    setNewInterest({ name: '', category: 'career' });
    setCustomCategory('');
  };

  const handleCategoryChange = (category: InterestCategory) => {
    setNewInterest(prev => ({ ...prev, category }));
    if (category !== 'custom') {
      setCustomCategory('');
    }
  };

  return (
    <div className="interests-container">
      <div className="interests-header">
        <h2>Interests</h2>
        <button className="add-button" onClick={() => setIsModalOpen(true)}>
          Add Interest
        </button>
      </div>

      <div className="interests-grid">
        {interests.map(interest => (
          <div key={interest.id} className={`interest-card ${interest.category}`}>
            <div className="interest-content">
              <h3>{interest.name}</h3>
              <span className="category-tag">{interest.category}</span>
            </div>
            <button 
              className="delete-button"
              onClick={() => onDeleteInterest(interest.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
            <h2>Add New Interest</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Interest Name</label>
                <input
                  type="text"
                  value={newInterest.name}
                  onChange={(e) => setNewInterest(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter interest name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <div className="category-buttons">
                  {defaultCategories.map(category => (
                    <button
                      key={category}
                      type="button"
                      className={`category-button ${newInterest.category === category ? 'active' : ''}`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                {newInterest.category === 'custom' && (
                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Enter new category name"
                    required
                  />
                )}
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interests; 