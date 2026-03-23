import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { LibroCard } from "../components/LibroCard"; 
import { BottomNav } from "../components/BottomNav";
import { Login } from "../components/Login"; 
import { PublicarLibros } from "../components/PublicarLibros"; 
import { PerfilUsuario } from "../components/PerfilUsuario";

export const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeView, setActiveView] = useState('inicio');
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [librosPublicados, setLibrosPublicados] = useState([]);
  const [librosDisponibles, setLibrosDisponibles] = useState([
    {
      id: 1,
      titulo: "El Principito",
      autor: "Antoine de Saint-Exupéry",
      categoria: "Novela",
      descripcion: "Un clásico de la literatura francesa que invita a reflexionar sobre la vida y la amistad.",
      imagen: "https://images.cdn3.buscalibre.com/fit-in/360x360/86/ea/86eaf73db9d5f84011b66ea43c70e642.jpg",
      estado: "Disponible"
    },
    {
      id: 2,
      titulo: "Proyecto Karón",
      autor: "Autor Ejemplo",
      categoria: "Ficción",
      descripcion: "Una historia fascinante sobre ciencia ficción y aventuras espaciales.",
      imagen: "https://via.placeholder.com/150",
      estado: "Disponible"
    },
    {
      id: 3,
      titulo: "Cien años de soledad",
      autor: "Gabriel García Márquez",
      categoria: "Literatura",
      descripcion: "Obra maestra del realismo mágico, historia de la familia Buendía.",
      imagen: "https://images.cdn3.buscalibre.com/fit-in/360x360/77/1e/771e19bc67e9c5e99bd71395cb0c791a.jpg",
      estado: "Disponible"
    }
  ]);

  useEffect(() => {
    // Función para cargar datos de forma segura
    const cargarDatos = () => {
      // Cargar usuario guardado con try-catch
      const usuarioGuardado = localStorage.getItem("usuarioActual");
      if (usuarioGuardado) {
        try {
          const usuario = JSON.parse(usuarioGuardado);
          setUsuarioActual(usuario);
        } catch (error) {
          console.error("Error al parsear usuario:", error);
          setUsuarioActual(null);
          localStorage.removeItem("usuarioActual"); // Limpiar datos corruptos
        }
      }

      // Cargar libros publicados con try-catch
      const librosGuardados = localStorage.getItem("librosPublicados");
      if (librosGuardados) {
        try {
          const libros = JSON.parse(librosGuardados);
          setLibrosPublicados(libros);
          
          // Agregar libros publicados a disponibles si no están ya
          setLibrosDisponibles(prev => {
            const nuevosLibros = libros.filter(libro =>
              !prev.some(p => p.id === libro.id)
            );
            return [...nuevosLibros, ...prev];
          });
        } catch (error) {
          console.error("Error al parsear libros:", error);
          localStorage.removeItem("librosPublicados"); // Limpiar datos corruptos
        }
      }
    };
    
    cargarDatos();
  }, []); // Solo se ejecuta una vez al montar el componente

  const handlePublicarLibro = (nuevoLibro) => {
    const librosActualizados = [nuevoLibro, ...librosPublicados];
    setLibrosPublicados(librosActualizados);
    localStorage.setItem("librosPublicados", JSON.stringify(librosActualizados));
    
    setLibrosDisponibles(prev => [{
      ...nuevoLibro,
      estado: "Disponible"
    }, ...prev]);
    
    setTimeout(() => {
      setActiveView("inicio");
    }, 1500);
  };

  const handleActualizarUsuario = (usuarioActualizado) => {
    setUsuarioActual(usuarioActualizado);
    localStorage.setItem("usuarioActual", JSON.stringify(usuarioActualizado));
  };

  const handleLogin = (usuario) => {
    setUsuarioActual(usuario);
    localStorage.setItem("usuarioActual", JSON.stringify(usuario));
    setIsLoginOpen(false);
  };

  return (
    <div className="home-page" style={{ position: 'relative', minHeight: '100vh', background: '#f1f2f6' }}>
      <Navbar 
        onOpenLogin={() => setIsLoginOpen(true)} 
        usuarioActual={usuarioActual}
      />
      
      {activeView === 'inicio' && <Hero />}
      
      <main style={{ padding: '20px 50px', paddingBottom: '120px' }}>
        {activeView === 'inicio' && (
          <div>
            <h2 style={{ marginBottom: '20px', color: '#1a237e' }}>📚 Libros Disponibles</h2>
            <div className="libros-grid">
              {librosDisponibles.map(libro => (
                <LibroCard 
                  key={libro.id}
                  titulo={libro.titulo}
                  categoria={libro.categoria}
                  descripcion={libro.descripcion}
                  imagen={libro.imagen}
                  autor={libro.autor}
                />
              ))}
            </div>
          </div>
        )}

        {activeView === 'publicar' && (
          <PublicarLibros 
            onPublicarLibro={handlePublicarLibro}
            usuarioActual={usuarioActual}
          />
        )}

        {activeView === 'perfil' && (
          <PerfilUsuario 
            usuarioActual={usuarioActual}
            onActualizarUsuario={handleActualizarUsuario}
            librosPublicados={librosPublicados}
          />
        )}
      </main>

      <BottomNav onNavigate={setActiveView} currentView={activeView} />

      {isLoginOpen && (
        <Login 
          onClose={() => setIsLoginOpen(false)} 
          onLogin={handleLogin}
        />
      )}
    </div>
  );
};