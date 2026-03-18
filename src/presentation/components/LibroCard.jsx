import "../styles/LibroCard.css";

export const LibroCard = ({ titulo, categoria, descripcion, imagen }) => {
  return (
    <div className="libro-card">
      <div className="card-header">
        <img src={imagen} alt={titulo} />
      </div>
      
      <div className="card-body">
        <div className="card-info">
          <h3>{titulo}</h3>
          <span className="badge">{categoria}</span>
          <p className="description-text">{descripcion}</p>
        </div>

        <div className="card-buttons">
          <button className="btn-swap">🔄Solicitar Intercambio</button>
          <button className="btn-details">ℹ️Detalles</button>
        </div>
      </div>
    </div>
  );
};