// En BottomNav.jsx - asegúrate de que esté así
export const BottomNav = ({ onNavigate, currentView }) => {
  return (
    <nav className="bottom-nav">
      <div className="nav-container">
        <button className={`nav-item ${currentView === 'inicio' ? 'active' : ''}`} 
                onClick={() => onNavigate('inicio')}>🏠</button>
        <button className="nav-item">💬</button>
        <button className={`nav-item camera-btn ${currentView === 'publicar' ? 'active' : ''}`} 
                onClick={() => onNavigate('publicar')}>📸</button>
        <button className="nav-item">❤️</button>
        <button className={`nav-item ${currentView === 'perfil' ? 'active' : ''}`} 
                onClick={() => onNavigate('perfil')}>👤</button>
      </div>
    </nav>
  );
};