import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import WeatherWidget from '../components/WeatherWidget';
import NewEntryForm from '../components/NewEntryForm';
import DiaryList from '../components/DiaryList';
import api from '../services/api';
import './Dashboard.css';

function Dashboard() {
  const { user, logout } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await api.get('/diary');
      setEntries(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch entries:', err);
      setError('Failed to load diary entries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleEntryCreated = (newEntry) => {
    setEntries([newEntry, ...entries]);
  };

  const handleEntryUpdated = (updatedEntry) => {
    setEntries(entries.map(entry => 
      entry._id === updatedEntry._id ? updatedEntry : entry
    ));
  };

  const handleEntryDeleted = (entryId) => {
    setEntries(entries.filter(entry => entry._id !== entryId));
  };

  if (!user) return null;

  return (
    <div className="dashboard">
      <Header user={user} onLogout={logout} />
      
      <main className="dashboard-main">
        <div className="dashboard-left">
          <WeatherWidget defaultLocation="New York" />
          <NewEntryForm onEntryCreated={handleEntryCreated} />
        </div>
        
        <div className="dashboard-right">
          <div className="entries-header">
            <h2>📝 Your Diary Entries</h2>
            <button className="refresh-btn" onClick={fetchEntries}>
              🔄 Refresh
            </button>
          </div>
          
          {loading && <div className="loading">Loading entries...</div>}
          {error && <div className="error">{error}</div>}
          
          {!loading && !error && (
            <DiaryList 
              entries={entries}
              onEntryUpdated={handleEntryUpdated}
              onEntryDeleted={handleEntryDeleted}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;