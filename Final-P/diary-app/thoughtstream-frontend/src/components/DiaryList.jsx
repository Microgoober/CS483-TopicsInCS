import DiaryEntryCard from './DiaryEntryCard';
import './DiaryList.css';

function DiaryList({ entries, onEntryUpdated, onEntryDeleted }) {
  if (entries.length === 0) {
    return (
      <div className="diary-list-empty">
        <div className="empty-state">
          <span className="empty-icon">📔</span>
          <h3>No entries yet</h3>
          <p>Start writing your first diary entry!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="diary-list">
      {entries.map((entry) => (
        <DiaryEntryCard
          key={entry._id}
          entry={entry}
          onUpdate={onEntryUpdated}
          onDelete={onEntryDeleted}
        />
      ))}
    </div>
  );
}

export default DiaryList;