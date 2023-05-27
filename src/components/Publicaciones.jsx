import React, { useState, useEffect } from 'react';
import "./Components.css";

const Publicaciones = () => {
  const [titulo, setTitulo] = useState('');
  const [precio, setPrecio] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [foto, setFoto] = useState('');
  const [pastelesData, setPastelesData] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/pasteles.json');
        const data = await response.json();
        setPastelesData(data);
      } catch (error) {
        console.error('Error al cargar los datos de los pasteles:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const savedPasteles = localStorage.getItem('pasteles');
    if (savedPasteles) {
      setPastelesData(JSON.parse(savedPasteles));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pasteles', JSON.stringify(pastelesData));
  }, [pastelesData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const nuevoPastel = {
      desc: '',
      id: `C${pastelesData.length + 1}`,
      img: foto,
      ingredients: ingredientes.split(',').map((ingrediente) => ingrediente.trim()),
      name: titulo,
      price: parseFloat(precio),
    };

    const nuevosPasteles = [...pastelesData, nuevoPastel];
    setPastelesData(nuevosPasteles);
    localStorage.setItem('pasteles', JSON.stringify(nuevosPasteles));

    setTitulo('');
    setPrecio('');
    setIngredientes('');
    setFoto('');

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="container7">
      <h2>Publicar Nuevo Pastel</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            placeholder="Ingresa el título del pastel"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            name="precio"
            placeholder="Ingresa el precio del pastel"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ingredientes">Ingredientes:</label>
          <textarea
            id="ingredientes"
            name="ingredientes"
            placeholder="Ingresa los ingredientes separados por comas (ejemplo: Harina, Azúcar, Huevos)"
            value={ingredientes}
            onChange={(e) => setIngredientes(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="foto">Foto:</label>
          <input
            type="file"
            id="foto"
            name="foto"
            accept="image/*"
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
            required
          />
        </div>
        <button type="submit">Publicar</button>
      </form>

      {showSuccess && (
        <div className="success-message">
          <p>Tu publicación se ha realizado con éxito.</p>
        </div>
      )}
    </div>
  );
};

export default Publicaciones;
