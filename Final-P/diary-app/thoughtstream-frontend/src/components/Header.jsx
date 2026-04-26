import './Header.css';

function Header({ user, onLogout }) {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon" role="img" aria-label="face in clouds"> {'\u{1F636}\u{200D}\u{1F32B}\u{FE0F}'} </span>
          <span className="logo-text">ThoughtStream</span>
        </div>
        
        <div className="header-right">
          <div className="user-info">
            {user.picture && (
              <img 
                src={user.picture} 
                alt={user.name}
                className="user-avatar"
              />
            )}
            <span className="user-name">{user.name}</span>
          </div>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;