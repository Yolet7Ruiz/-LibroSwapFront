import "../styles/BottomNav.css";

export const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <div className="nav-container">
        <button className="nav-item active">🏠</button>
        <button className="nav-item">💬</button>
        <button className="nav-item camera-btn">📸</button>
        <button className="nav-item">❤️</button>
        <button className="nav-item">👤</button>
      </div>
    </nav>
  );
};