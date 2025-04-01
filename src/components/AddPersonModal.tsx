import React, { useState } from 'react';
import { Person } from '../types';
import './AddPersonModal.css';

interface AddPersonModalProps {
  onClose: () => void;
  onAdd: (person: Omit<Person, 'id' | 'userId' | 'createdAt' | 'groupIds'>) => void;
}

export function AddPersonModal({ onClose, onAdd }: AddPersonModalProps): React.ReactElement {
  const [formData, setFormData] = useState({
    name: '',
    affiliation: '',
    field: '',
    notes: '',
    profileImage: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let profileImageUrl = '';
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'Lira Suh');

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/your-cloud-name/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        const data = await response.json();
        profileImageUrl = data.secure_url;
      }

      onAdd({
        ...formData,
        profileImage: profileImageUrl
      });
      onClose();
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profileImage: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Add New Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="image-upload-container">
            <div className="image-preview">
              {formData.profileImage ? (
                <img src={formData.profileImage} alt="Profile preview" />
              ) : (
                <div className="image-placeholder">
                  <span>👤</span>
                </div>
              )}
            </div>
            <label className="image-upload-button">
              Choose Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
          <input
            type="text"
            placeholder="Affiliation"
            value={formData.affiliation}
            onChange={e => setFormData(prev => ({ ...prev, affiliation: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Research Field"
            value={formData.field}
            onChange={e => setFormData(prev => ({ ...prev, field: e.target.value }))}
          />
          <textarea
            placeholder="Notes"
            value={formData.notes}
            onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          />
          <button type="submit" disabled={isUploading}>
            {isUploading ? 'Adding...' : 'Add Contact'}
          </button>
        </form>
      </div>
    </div>
  );
}
