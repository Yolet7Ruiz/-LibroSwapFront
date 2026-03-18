// src/presentation/components/Hero.jsx
import "../styles/Hero.css";

export const Hero = () => {
  return (
    <section className="hero">
      <h1>Intercambia libro, y fomenta la lectura</h1>
      <div className="search-container">
        <span className="search-icon">🔍</span>
        <input type="text" placeholder="Buscar por nombre o autor..." />
      </div>
    </section>
  );
};