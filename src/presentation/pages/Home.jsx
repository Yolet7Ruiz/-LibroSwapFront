import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { LibroCard } from "../components/LibroCard"; 
import { BottomNav } from "../components/BottomNav";
import { Login } from "../components/Login"; 

export const Home = () => {
  // Estado para abrir/cerrar el Login
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="home-page" style={{ position: 'relative', minHeight: '100vh' }}>
      
      {/* Pasamos la función para ABRIR el login al Navbar */}
      <Navbar onOpenLogin={() => setIsLoginOpen(true)} />
      
      <Hero />
      
      <main style={{ padding: '20px 50px', paddingBottom: '120px' }}>
        <h2>Libros Disponibles</h2>
        <hr style={{ borderColor: '#8e7dff', opacity: '0.3', marginBottom: '30px' }} />
        
        <div className="libros-grid">
          <LibroCard 
            titulo="El Principito" 
            categoria="Novela" 
            descripcion="El principito es una novela corta y la obra más famosa..." 
            imagen="https://relaxmoment.org/wp-content/uploads/2023/05/El-Principito.jpg" 
          />
          <LibroCard 
            titulo="Los Juegos del Hambre" 
            categoria="Acción/Aventura" 
            descripcion="El primer libro de la trilogía homónima escrita por Suzanne Collins." 
            imagen="https://m.media-amazon.com/images/I/61I24wOsn8L._AC_UF1000,1000_QL80_.jpg" 
          />
          <LibroCard 
            titulo="Proyecto Karón" 
            categoria="Ficción" 
            descripcion="Alaxi Dalem está acostumbrado a una vida tranquila..." 
            imagen="https://cdn.wallapop.com/images/10420/kb/d3/__/c10420p1228410706/i6278371563.jpg?pictureSize=W640"
          />
        </div>
      </main>

      <BottomNav />

      {/* Si el interruptor es true, mostramos el Login y le pasamos la función para CERRAR */}
      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
      
    </div>
  );
};