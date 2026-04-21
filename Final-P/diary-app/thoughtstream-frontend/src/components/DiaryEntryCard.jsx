import { useState } from 'react';
import api from '../services/api';
import './DiaryEntryCard.css';

function DiaryEntryCard({ entry, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: entry.title,
    content: entry.content,
    location: entry.location,
    reflection: entry.reflection || '',
    tags: entry.tags?.join(', ') || '',
  });
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const tagsArray = editData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag);

      const response = await api.put(`/diary/${entry._id}`, {
        title: editData.title,
        content: editData.content,
        location: editData.location,
        reflection: editData.reflection || undefined,
        tags: tagsArray,
      });
      
      onUpdate(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update:', err);
      alert('Failed to update entry');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await api.delete(`/diary/${entry._id}`);
        onDelete(entry._id);
      } catch (err) {
        console.error('Failed to delete:', err);
        alert('Failed to delete entry');
      }
    }
  };

  if (isEditing) {
    return (
      <div className="diary-card editing">
        <div className="card-content">
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleEditChange}
            className="edit-title"
            placeholder="Title"
          />
          <textarea
            name="content"
            value={editData.content}
            onChange={handleEditChange}
            className="edit-content"
            rows="4"
            placeholder="Content"
          />
          <input
            type="text"
            name="location"
            value={editData.location}
            onChange={handleEditChange}
            className="edit-location"
            placeholder="Location"
          />
          <textarea
            name="reflection"
            value={editData.reflection}
            onChange={handleEditChange}
            className="edit-reflection"
            rows="2"
            placeholder="Reflection (optional)"
          />
          <input
            type="text"
            name="tags"
            value={editData.tags}
            onChange={handleEditChange}
            className="edit-tags"
            placeholder="Tags (comma-separated)"
          />
          <div className="edit-actions">
            <button onClick={handleUpdate} disabled={loading} className="save-btn">
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button onClick={() => setIsEditing(false)} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="diary-card">
      <div className="card-header">
        <h3 className="card-title">{entry.title}</h3>
        <div className="card-actions">
          <button onClick={() => setIsEditing(true)} className="edit-btn">
            ✏️
          </button>
          <button onClick={handleDelete} className="delete-btn">
            🗑️
          </button>
        </div>
      </div>
      
      <div className="card-body">
        <p className="card-content-preview">{entry.content}</p>
        
        {entry.reflection && (
          <div className="card-reflection">
            <strong>Reflection:</strong>
            <p>{entry.reflection}</p>
          </div>
        )}
        
        <div className="card-meta">
          <div className="meta-item">
            <span>📍</span>
            <span>{entry.location}</span>
          </div>
          
          {entry.weather && (
            <div className="meta-item">
              <span>🌤️</span>
              <span>{entry.weather.condition}, {entry.weather.temperature}°F</span>
            </div>
          )}
          
          {entry.tags && entry.tags.length > 0 && (
            <div className="meta-item tags">
              <span>🏷️</span>
              <div className="tag-list">
                {entry.tags.map((tag, i) => (
                  <span key={i} className="tag">#{tag}</span>
                ))}
              </div>
            </div>
          )}
          
          <div className="meta-item">
            <span>📅</span>
            <span>{formatDate(entry.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiaryEntryCard;