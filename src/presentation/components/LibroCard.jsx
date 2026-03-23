import "../styles/LibroCard.css";

export const LibroCard = ({ titulo, categoria, descripcion, imagen, autor }) => {
  return (
    <div className="libro-card">
      <div className="card-header">
        <img src={imagen} alt={titulo} />
      </div>
      
      <div className="card-body">
        <div className="card-info">
          <h3>{titulo}</h3>
          {autor && <p style={{ fontSize: '0.8rem', color: '#666', margin: '5px 0' }}>✍️ {autor}</p>}
          <span className="badge">{categoria}</span>
          <p className="description-text">{descripcion}</p>
        </div>

        <div className="card-buttons">
          <button className="btn-swap">🔄 Solicitar Intercambio</button>
          <button className="btn-details">ℹ️ Detalles</button>
        </div>
      </div>
    </div>
  );
};