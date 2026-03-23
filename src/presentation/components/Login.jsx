import React, { useState } from "react";
import "../styles/Login.css";

export const Login = ({ onClose, onLogin }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Crear el perfil del usuario
    const nuevoUsuario = {
      nombre: nombre || "Usuario LibroSwap",
      email: email || "usuario@libroswap.com",
      descripcion: descripcion || "¡Hola! Me encanta leer y compartir libros. 🎉",
      fechaRegistro: new Date().toLocaleDateString()
    };
    
    if (onLogin) {
      onLogin(nuevoUsuario);
    }
    onClose();
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="login-header">
          <h2>✨ ¡Bienvenido!</h2>
          <p>Crea tu perfil en <span>LibroSwap</span></p>
        </div>

        <form className="login-form-pro" onSubmit={handleSubmit}>
          <div className="input-box">
            <input 
              type="text" 
              required 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <label>Tu nombre</label>
          </div>

          <div className="input-box">
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Correo Electrónico</label>
          </div>

          <div className="input-box">
            <textarea 
              required 
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows="2"
              style={{ 
                width: '100%', 
                padding: '12px 0', 
                border: 'none', 
                borderBottom: '2px solid #ddd',
                outline: 'none',
                background: 'transparent',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
            <label>Sobre ti</label>
          </div>

          <button type="submit" className="login-main-btn">
            Comenzar a intercambiar 🚀
          </button>
          
          <p className="forgot-pass" onClick={() => {}}>
            ¿Ya tienes cuenta? Inicia sesión
          </p>
        </form>
      </div>
    </div>
  );
};