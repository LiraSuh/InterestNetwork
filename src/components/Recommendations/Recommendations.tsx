import React from 'react';
import { Person, Interest } from '../../types';
import './Recommendations.css';

interface RecommendationsProps {
  interests: Interest[];
  persons: Person[];
  onAddToNetwork: (person: Person) => void;
  onToggleFavorite: (personId: string) => void;
}

export const Recommendations: React.FC<RecommendationsProps> = ({
  interests,
  persons,
  onAddToNetwork,
  onToggleFavorite
}) => {
  const calculateRelevance = (person: Person): number => {
    if (!interests.length) return 0.5; // Default score when no interests

    let score = 0;
    let totalWeight = 0;

    interests.forEach(interest => {
      // Expertise matching (highest weight)
      const expertiseMatch = person.expertise.some(exp => 
        exp.toLowerCase().includes(interest.name.toLowerCase())
      );
      if (expertiseMatch) {
        score += 0.8;
        totalWeight += 0.8;
      }

      // Research field matching
      const fieldMatch = person.field.toLowerCase().includes(interest.name.toLowerCase());
      if (fieldMatch) {
        score += 0.6;
        totalWeight += 0.6;
      }

      // Affiliation matching
      const affiliationMatch = person.affiliation.toLowerCase().includes(interest.name.toLowerCase());
      if (affiliationMatch) {
        score += 0.4;
        totalWeight += 0.4;
      }

      // Category matching
      const categoryMatch = person.expertise.some(exp => 
        exp.toLowerCase().includes(interest.category.toLowerCase())
      );
      if (categoryMatch) {
        score += 0.3;
        totalWeight += 0.3;
      }
    });

    return totalWeight > 0 ? score / totalWeight : 0;
  };

  const getRecommendations = () => {
    const recommendations = persons.map(person => ({
      ...person,
      relevance: calculateRelevance(person)
    }));

    if (!interests.length) {
      // Randomize recommendations when no interests
      return recommendations.sort(() => Math.random() - 0.5);
    }

    // Sort by relevance score
    return recommendations.sort((a, b) => b.relevance - a.relevance);
  };

  const generateRecommendationReason = (person: Person): string => {
    if (!interests.length) {
      return `Based on ${person.field} expertise`;
    }

    const matchedInterests = interests.filter(interest => {
      return person.expertise.some(exp => 
        exp.toLowerCase().includes(interest.name.toLowerCase())
      ) || person.field.toLowerCase().includes(interest.name.toLowerCase());
    });

    if (matchedInterests.length === 0) {
      return `Based on ${person.field} expertise`;
    }

    const interestNames = matchedInterests.map(i => i.name).join(', ');
    return `Based on your interests in ${interestNames}`;
  };

  const recommendations = getRecommendations();

  return (
    <div className="recommendations-container">
      <h2>Recommended Experts</h2>
      {recommendations.length === 0 ? (
        <div className="no-recommendations">
          No experts available at the moment.
        </div>
      ) : (
        <div className="recommendations-grid">
          {recommendations.map(person => (
            <div key={person.id} className="recommendation-card">
              <div className="recommendation-header">
                <img 
                  src={person.profileImage} 
                  alt={person.name} 
                  className="expert-avatar"
                />
                <button 
                  className={`favorite-button ${person.isFavorite ? 'active' : ''}`}
                  onClick={() => onToggleFavorite(person.id)}
                >
                  {person.isFavorite ? '★' : '☆'}
                </button>
              </div>
              <div className="recommendation-info">
                <h3>{person.name}</h3>
                <p className="expert-title">{person.title}</p>
                <p className="expert-affiliation">{person.affiliation}</p>
                <div className="expertise-tags">
                  {person.expertise.map((exp, index) => (
                    <span key={index} className="expertise-tag">{exp}</span>
                  ))}
                </div>
                <p className="recommendation-reason">
                  {generateRecommendationReason(person)}
                </p>
                <div className="publications">
                  <h4>Publications</h4>
                  <ul>
                    {person.publications.map((pub, index) => (
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
      )}
    </div>
  );
}; 