import "../styles/Navbar.css";

export const Navbar = ({ onOpenLogin, usuarioActual }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div className="logo-icon">📖</div>
        <span>LibroSwap</span>
      </div>
      <div className="navbar-actions">
        {usuarioActual ? (
          <>
            <div className="user-icon" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>👤</span>
              <span style={{ fontWeight: 'bold' }}>{usuarioActual.nombre}</span>
            </div>
          </>
        ) : (
          <button className="btn-login" onClick={onOpenLogin}>
            Iniciar Sesión
          </button>
        )}
      </div>
    </nav>
  );
};