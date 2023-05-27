import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHeart as faHeartRegular, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-regular-svg-icons";
import "./Components.css";
import ContextPasteleria from "../PasteleriaContext";
import { useAuth } from "../AuthContext";

const CardPastel = () => {
  const { anadirCarrito } = useContext(ContextPasteleria);
  const [filtro, setFiltro] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [botonDesactivado, setBotonDesactivado] = useState({});
  const [favoritos, setFavoritos] = useState([]);
  const [filtroLetra, setFiltroLetra] = useState("");
  const [pastelesLocalStorage, setPastelesLocalStorage] = useState([]);
  const { usuario } = useAuth(); 

  useEffect(() => {
    const savedPasteles = localStorage.getItem('pasteles');
    const savedFavoritos = localStorage.getItem('favoritos');
    if (savedPasteles) {
      setPastelesLocalStorage(JSON.parse(savedPasteles));
    } else {
      fetch('ruta-al-archivo/pasteles.json')
        .then(response => response.json())
        .then(data => {
          setPastelesLocalStorage(data);
          localStorage.setItem('pasteles', JSON.stringify(data));
        })
        .catch(error => {
          console.error('Error al cargar los datos desde el JSON:', error);
        });
    }
    if (savedFavoritos) {
      setFavoritos(JSON.parse(savedFavoritos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  const filtrarPasteles = (pasteles, filtro, filtroLetra) => {
    let pastelesFiltrados = pasteles;

    if (filtro === "favoritos") {
      pastelesFiltrados = pasteles.filter((pastel) =>
        favoritos.includes(pastel.id)
      );
    }

    if (filtroLetra) {
      pastelesFiltrados = pastelesFiltrados.filter((pastel) =>
        pastel.name.toLowerCase().startsWith(filtroLetra.toLowerCase())
      );
    }

    return pastelesFiltrados;
  };

  const pastelesFiltrados = filtrarPasteles(
    [...pastelesLocalStorage],
    filtro,
    filtroLetra
  );

  const handleAñadir = (pastel) => {
    anadirCarrito(pastel);
    setMensaje("Pastel añadido al carrito");
    setBotonDesactivado((prev) => ({ ...prev, [pastel.id]: true }));

    setTimeout(() => {
      setMensaje("");
      setBotonDesactivado((prev) => ({ ...prev, [pastel.id]: false }));
    }, 2000);
  };

  const handleEliminar = (id) => {
    const nuevosPasteles = pastelesLocalStorage.filter((pastel) => pastel.id !== id);
    setPastelesLocalStorage(nuevosPasteles);
    localStorage.setItem('pasteles', JSON.stringify(nuevosPasteles));
  };

  const handleFavorito = (pastel) => {
    if (favoritos.includes(pastel.id)) {
      const nuevosFavoritos = favoritos.filter((id) => id !== pastel.id);
      setFavoritos(nuevosFavoritos);
      localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
    } else {
      const nuevosFavoritos = [...favoritos, pastel.id];
      setFavoritos(nuevosFavoritos);
      localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
    }
  };

  return (
    <>
      <div className="filtro-container2">
        <div className="filtro-input">
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="">Todos los Pasteles</option>
            <option value="favoritos">Favoritos</option>
          </select>
          <input
            type="text"
            placeholder="Filtrar por Letra"
            value={filtroLetra}
            onChange={(e) => setFiltroLetra(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className="filtro-icono" />
        </div>
      </div>
      <div className="contenedorPastel">
        {pastelesFiltrados.map((pastel) => (
          <div key={pastel.id}>
            <div className="card">
              <img className="card-img-top" src={pastel.img} alt={pastel.name} />
              <div className="card-body">
                <h5 className="tituloPastel">{pastel.name}</h5>
                <hr />
                <p>Ingredientes:</p>
                <div>
                  {pastel.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </div>
              </div>
              <div className="footer">
                <h2 className="price">$ {pastel.price}</h2>
                <div className="buttons">
                  {usuario && (
                    <>
                      <button
                        className="buttonEliminar"
                        onClick={() => handleEliminar(pastel.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} className="trash-icon" />
                      </button>
                      <button
                        className="buttonAnadir"
                        onClick={() => handleFavorito(pastel)}
                      >
                        <FontAwesomeIcon
                          icon={favoritos.includes(pastel.id) ? faHeartRegular : faHeartSolid}
                          className="heart-icon"
                        />
                      </button>
                    </>
                  )}
                  <button
                    className="buttonAnadir"
                    onClick={() => handleAñadir(pastel)}
                    disabled={botonDesactivado[pastel.id]}
                  >
                    {botonDesactivado[pastel.id] ? "Añadido" : "Comprar"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {mensaje && <p>{mensaje}</p>}
    </>
  );
};

export default CardPastel;