import React, { useState } from "react";
import "../styles/Login.css";

export const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-overlay">
      <div className="login-glass-card">
        {/* Botón de cerrar elegante */}
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="login-header">
          
          <h2>¡Bienvenido!</h2>
          <p>Inicia sesión para continuar en <span>LibroSwap</span></p>
        </div>

        <form className="login-form-pro">
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
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Contraseña</label>
          </div>

          <button type="submit" className="login-main-btn">
            Entrar ahora
          </button>
          
          <p className="forgot-pass">¿Olvidaste tu contraseña?</p>
        </form>
      </div>
    </div>
  );
};