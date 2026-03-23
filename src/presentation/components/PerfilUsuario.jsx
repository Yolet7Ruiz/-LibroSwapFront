import React, { useState, useEffect } from "react";
import "../styles/PerfilUsuario.css";

export const PerfilUsuario = ({ usuarioActual, onActualizarUsuario, librosPublicados = [] }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [fechaRegistro, setFechaRegistro] = useState("");

  useEffect(() => {
    // Función para cargar datos
    const cargarDatos = () => {
      if (usuarioActual && usuarioActual.nombre) {
        setNombre(usuarioActual.nombre);
        setDescripcion(usuarioActual.descripcion || "");
        setEmail(usuarioActual.email || "");
        setFechaRegistro(usuarioActual.fechaRegistro || new Date().toLocaleDateString());
        return;
      }
      
      const usuarioGuardado = localStorage.getItem("usuarioActual");
      if (usuarioGuardado) {
        try {
          const usuario = JSON.parse(usuarioGuardado);
          setNombre(usuario.nombre || "Usuario");
          setDescripcion(usuario.descripcion || "");
          setEmail(usuario.email || "");
          setFechaRegistro(usuario.fechaRegistro || new Date().toLocaleDateString());
        } catch (error) {
          console.error("Error:", error);
          setNombre("Usuario");
          setDescripcion("");
          setEmail("");
          setFechaRegistro(new Date().toLocaleDateString());
        }
      } else {
        setNombre("Usuario");
        setDescripcion("");
        setEmail("");
        setFechaRegistro(new Date().toLocaleDateString());
      }
    };
    
    cargarDatos();
  }, [usuarioActual]);

  const guardarCambios = () => {
    const usuarioActualizado = { nombre, descripcion, email, fechaRegistro };
    localStorage.setItem("usuarioActual", JSON.stringify(usuarioActualizado));
    if (onActualizarUsuario) onActualizarUsuario(usuarioActualizado);
    setIsEditing(false);
  };

  const misLibros = librosPublicados.filter(libro => libro.usuario === nombre);

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <div className="perfil-header-info">
          <div className="avatar-circle">{nombre?.charAt(0) || "?"}</div>
          <div className="text-info">
            {isEditing ? (
              <input className="edit-input" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            ) : (
              <h2>{nombre || "Usuario"}</h2>
            )}
            <p>{email || "email@ejemplo.com"}</p>
            <p>Miembro desde {fechaRegistro || "hoy"}</p>
          </div>
          <button className="btn-edit" onClick={() => isEditing ? guardarCambios() : setIsEditing(true)}>
            {isEditing ? "Guardar" : "Editar"}
          </button>
        </div>

        <div className="perfil-bio">
          <h3>Sobre mí</h3>
          {isEditing ? (
            <textarea className="edit-textarea" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
          ) : (
            <p>{descripcion || "Sin descripción"}</p>
          )}
        </div>

        <div className="perfil-historial">
          <h3>Mis Publicaciones</h3>
          {misLibros.length === 0 ? (
            <p>No has publicado libros aún</p>
          ) : (
            misLibros.map(libro => (
              <div key={libro.id} className="historial-item">
                <div className="item-info">
                  <strong>{libro.titulo}</strong>
                  <span>{libro.fechaPublicacion}</span>
                </div>
                <span className={`status-badge ${libro.estadoPublicacion?.toLowerCase()}`}>
                  {libro.estadoPublicacion}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};