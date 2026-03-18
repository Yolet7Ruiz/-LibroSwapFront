import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// Importamos el CSS global que creamos para los colores de Figma
import './presentation/styles/global.css' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)