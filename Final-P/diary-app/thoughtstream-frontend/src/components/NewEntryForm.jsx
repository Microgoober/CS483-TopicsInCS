import { useState } from 'react';
import api from '../services/api';
import './NewEntryForm.css';

function NewEntryForm({ onEntryCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    location: '',
    reflection: '',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.location.trim()) {
      setError('Title, content, and location are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag);

      const response = await api.post('/diary', {
        title: formData.title.trim(),
        content: formData.content.trim(),
        location: formData.location.trim(),
        reflection: formData.reflection.trim() || undefined,
        tags: tagsArray,
      });

      // Reset form
      setFormData({
        title: '',
        content: '',
        location: '',
        reflection: '',
        tags: '',
      });

      onEntryCreated(response.data);
    } catch (err) {
      console.error('Failed to create entry:', err);
      setError(err.response?.data?.message || 'Failed to create diary entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-entry-form">
      <h3>✍️ Write New Entry</h3>
      
      {error && <div className="form-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="What's on your mind?"
            maxLength={100}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Content *</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your thoughts here..."
            rows="5"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, State or location name"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Reflection (optional)</label>
          <textarea
            name="reflection"
            value={formData.reflection}
            onChange={handleChange}
            placeholder="Any reflections or insights? (max 500 chars)"
            rows="3"
            maxLength="500"
          />
        </div>
        
        <div className="form-group">
          <label>Tags (optional, comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., gratitude, ideas, memories"
          />
        </div>
        
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Saving...' : 'Save Entry'}
        </button>
      </form>
    </div>
  );
}

export default NewEntryForm;