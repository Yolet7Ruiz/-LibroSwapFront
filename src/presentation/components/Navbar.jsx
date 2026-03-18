import "../styles/Navbar.css";

// Recibimos la prop onOpenLogin
export const Navbar = ({ onOpenLogin }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div className="logo-icon">📖</div>
        <span>LibroSwap</span>
      </div>
      <div className="navbar-actions">
        <div className="user-icon">👤</div>
        {/* Al darle click, ejecutamos la función que viene del Home */}
        <button className="btn-login" onClick={onOpenLogin}>
            Inicia Sesion
        </button>
      </div>
    </nav>
  );
};