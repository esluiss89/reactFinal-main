import React, { useState, useEffect } from 'react';
import "./Components.css";

const Publicaciones = () => {
  const [titulo, setTitulo] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [foto, setFoto] = useState('');
  const [pastelesData, setPastelesData] = useState([]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const nuevoPastel = {
      desc: descripcion,
      id: `C${pastelesData.length + 1}`,
      img: foto,
      ingredients: ["Harina", "Galletas", "Queso crema", "Azúcar", "Frutos rojos"],
      name: titulo,
      price: parseFloat(precio)
    };

    setPastelesData([...pastelesData, nuevoPastel]);

    setTitulo('');
    setPrecio('');
    setDescripcion('');
    setFoto('');
  };

  return (
    <div className="container">
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
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            placeholder="Ingresa la descripción del pastel"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
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
    </div>
  );
};

export default Publicaciones;
