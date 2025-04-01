import React from 'react';
import { Person } from '../../types';
import './AddNetwork.css';

interface AddNetworkProps {
  persons: Person[];
  onAddToNetwork: (person: Person) => void;
  onToggleFavorite: (personId: string) => void;
}

export const AddNetwork: React.FC<AddNetworkProps> = ({
  persons,
  onAddToNetwork,
  onToggleFavorite
}) => {
  return (
    <div className="add-network-container">
      <div className="add-network-header">
        <h2>Add to Network</h2>
        <p className="subtitle">Connect with experts in your field</p>
      </div>

      <div className="add-network-grid">
        {persons.map(person => (
          <div key={person.id} className="network-card">
            <div className="network-header">
              <img 
                src={person.profileImage} 
                alt={person.name} 
                className="network-avatar"
              />
              <button 
                className={`favorite-button ${person.isFavorite ? 'active' : ''}`}
                onClick={() => onToggleFavorite(person.id || '')}
              >
                {person.isFavorite ? '★' : '☆'}
              </button>
            </div>
            <div className="network-info">
              <h3>{person.name}</h3>
              <p className="network-title">{person.title}</p>
              <p className="network-affiliation">{person.affiliation}</p>
              <div className="network-expertise">
                {person.expertise?.map((exp, index) => (
                  <span key={index} className="expertise-tag">{exp}</span>
                ))}
              </div>
              <div className="network-publications">
                <h4>Publications</h4>
                <ul>
                  {person.publications?.map((pub, index) => (
                    <li key={index}>{pub}</li>
                  ))}
                </ul>
              </div>
              <button 
                className="add-to-network-button"
                onClick={() => onAddToNetwork(person)}
              >
                Add to Network
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 