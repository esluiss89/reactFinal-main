import React, { useEffect, useState } from "react";
import "./Favorito.css";

const Favoritos = () => {
  const [pastelesFavoritos, setPastelesFavoritos] = useState([]);

  useEffect(() => {
    const obtenerPastelesFavoritos = async () => {
      const response = await fetch("/pasteles.json");
      const data = await response.json();

      const favoritosLocalStorage = JSON.parse(localStorage.getItem("favoritos")) || [];

      const pastelesFavoritos = data
        .filter((pastel) => favoritosLocalStorage.includes(pastel.id))
        .map((pastel) => ({
          ...pastel,
          favorite: true,
        }));

      setPastelesFavoritos(pastelesFavoritos);
    };

    obtenerPastelesFavoritos();
  }, []);

  const toggleFavorito = (pastelId) => {
    const favoritosLocalStorage = JSON.parse(localStorage.getItem("favoritos")) || [];

    const nuevosFavoritos = favoritosLocalStorage.filter((id) => id !== pastelId);

    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));

    const pastelesFavoritosActualizados = pastelesFavoritos.filter((pastel) => pastel.id !== pastelId);

    setPastelesFavoritos(pastelesFavoritosActualizados);
  };

  return (
    <div className="container">
      <h2 className="text-center mt-5" style={{ fontFamily: 'cursive', fontSize: '2.5rem', color: '#e91e63' }}>
        Mis Favoritos
      </h2>
      <div className="row justify-content-center">
        {pastelesFavoritos.map((pastel) => (
          <div key={pastel.id} className="col-md-6 col-lg-4">
            <div className="card mb-4" style={{ border: 'none', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
              <img src={pastel.img} className="card-img-top" alt={pastel.name} style={{ maxHeight: '300px' }} />
              <div className="card-body">
                <h3 className="card-title" style={{ fontFamily: 'cursive', fontSize: '1.8rem', color: '#e91e63' }}>
                  {pastel.name}
                </h3>
                <p className="card-text" style={{ fontSize: '1.2rem' }}>{pastel.desc}</p>
                <p className="card-text" style={{ fontSize: '1.1rem' }}>Ingredients: {pastel.ingredients.join(", ")}</p>
                <p className="card-text" style={{ fontSize: '1.1rem' }}>Price: ${pastel.price}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => toggleFavorito(pastel.id)}
                  style={{ backgroundColor: '#e91e63', color: 'white', border: 'none' }}
                >
                  Quitar de favoritos
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  
  
};

export default Favoritos;
