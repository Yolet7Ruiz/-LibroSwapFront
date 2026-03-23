import React, { useState, useRef } from "react";
import "../styles/PublicarLibros.css";

export const PublicarLibros = ({ onPublicarLibro, usuarioActual }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    categoria: "",
    estado: "",
    descripcion: "",
  });
  
  const [imagen, setImagen] = useState(null);
  const [vistaPrevia, setVistaPrevia] = useState(null);
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);
  const fileInputRef = useRef(null);

  const categorias = ["Ficción", "No Ficción", "Ciencia", "Historia", "Tecnología", "Arte", "Literatura", "Infantil"];
  const estados = ["Nuevo", "Como nuevo", "Buen estado", "Aceptable"];

  const manejarCambioImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError("❌ Por favor selecciona una imagen válida");
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError("❌ La imagen no debe exceder los 5MB");
        return;
      }
      
      setImagen(file);
      setVistaPrevia(URL.createObjectURL(file));
      setError("");
    }
  };

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const manejarPublicar = () => {
    // Validaciones
    if (!formData.titulo) {
      setError("⚠️ El título es obligatorio");
      return;
    }
    if (!formData.autor) {
      setError("⚠️ El autor es obligatorio");
      return;
    }
    if (!formData.categoria) {
      setError("⚠️ La categoría es obligatoria");
      return;
    }
    if (!formData.estado) {
      setError("⚠️ El estado es obligatorio");
      return;
    }
    if (!formData.descripcion) {
      setError("⚠️ La descripción es obligatoria");
      return;
    }
    if (!imagen) {
      setError("❌ Por favor selecciona una imagen");
      return;
    }
    
    // Crear el libro SIN usar Date.now() de forma complicada
    const nuevoLibro = {
      id: String(Math.random() * 1000000), // ID simple como string
      titulo: formData.titulo,
      autor: formData.autor,
      categoria: formData.categoria,
      estado: formData.estado,
      descripcion: formData.descripcion,
      imagen: vistaPrevia,
      fechaPublicacion: new Date().toLocaleString(),
      usuario: usuarioActual ? usuarioActual.nombre : "Usuario",
      estadoPublicacion: "Publicado"
    };
    
    console.log("Libro a publicar:", nuevoLibro); // Para depurar
    
    if (onPublicarLibro) {
      onPublicarLibro(nuevoLibro);
    }
    
    setExito(true);
    setError("");
    
    setTimeout(() => {
      setExito(false);
      // Limpiar formulario
      setFormData({
        titulo: "",
        autor: "",
        categoria: "",
        estado: "",
        descripcion: "",
      });
      setImagen(null);
      setVistaPrevia(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }, 2000);
  };
  
  const estaCompleto = formData.titulo && formData.autor && formData.categoria && 
                        formData.estado && formData.descripcion && imagen;

  return (
    <div className="publicar-container">
      <div className="header-blue">
        <h2>📚 Publicar un Libro</h2>
        <p>Comparte tus libros con la comunidad</p>
      </div>

      <div className="form-content">
        {exito && (
          <div className="success-message">
            ✅ ¡Libro publicado exitosamente!
          </div>
        )}
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-section">
          <label>📸 Imagen del Libro *</label>
          <div 
            className="upload-box" 
            onClick={() => fileInputRef.current.click()}
            style={{ cursor: 'pointer' }}
          >
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={manejarCambioImagen} 
            />
            {vistaPrevia ? (
              <div style={{ textAlign: 'center' }}>
                <img src={vistaPrevia} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '10px' }} />
                <button 
                  style={{ display: 'block', margin: '10px auto', background: '#ff4757', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setImagen(null);
                    setVistaPrevia(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                >
                  Cambiar imagen
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px' }}>📷</div>
                <p>Haz clic para seleccionar una imagen</p>
                <small>Formatos: JPG, PNG, GIF (máx. 5MB)</small>
              </div>
            )}
          </div>
        </div>

        <div className="form-section">
          <div className="grid-form">
            <div className="input-group">
              <label>Título del libro *</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={manejarCambioInput}
                placeholder="Ej: Cien años de soledad"
              />
            </div>
            
            <div className="input-group">
              <label>Autor *</label>
              <input
                type="text"
                name="autor"
                value={formData.autor}
                onChange={manejarCambioInput}
                placeholder="Ej: Gabriel García Márquez"
              />
            </div>
            
            <div className="input-group">
              <label>Categoría *</label>
              <select name="categoria" value={formData.categoria} onChange={manejarCambioInput}>
                <option value="">Selecciona una categoría</option>
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="input-group">
              <label>Estado del libro *</label>
              <select name="estado" value={formData.estado} onChange={manejarCambioInput}>
                <option value="">Selecciona el estado</option>
                {estados.map(est => (
                  <option key={est} value={est}>{est}</option>
                ))}
              </select>
            </div>
            
            <div className="input-group full-width">
              <label>Descripción *</label>
              <textarea
                name="descripcion"
                rows="4"
                value={formData.descripcion}
                onChange={manejarCambioInput}
                placeholder="Describe el libro..."
              />
            </div>
          </div>
        </div>

        <div className="publish-footer">
          <button 
            type="button" 
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              background: estaCompleto ? '#1a237e' : '#e0e0e0',
              color: estaCompleto ? 'white' : '#999',
              cursor: estaCompleto ? 'pointer' : 'not-allowed'
            }}
            onClick={manejarPublicar}
            disabled={!estaCompleto}
          >
            {estaCompleto ? "🚀 Publicar Libro" : "📝 Completa todos los campos (incluye imagen)"}
          </button>
        </div>
      </div>
    </div>
  );
};