import React, { createContext, useState, useEffect } from "react";

const PasteleriaContext = createContext();

const PasteleriaFunction = ({ children }) => {
  const [pastel, setPastel] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const [pastelesLocalStorage, setPastelesLocalStorage] = useState([]);

  useEffect(() => {
    fetchDataPasteles();
  }, []);

  useEffect(() => {
    const storedFavoritos = JSON.parse(localStorage.getItem("favoritos"));
    if (storedFavoritos) {
      setFavoritos(storedFavoritos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const fetchDataPasteles = async () => {
    try {
      const response = await fetch("/pasteles.json");
      const data = await response.json();
      setPastel(data);
      setPastelesLocalStorage(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const anadirCarrito = ({ id, price, name, img }) => {
    const idPastel = carrito.findIndex((item) => item.id === id);
    const pastelUnidad = { id, price, name, img, count: 1 };

    if (idPastel >= 0) {
      const newCarrito = [...carrito];
      newCarrito[idPastel].count++;
      setCarrito(newCarrito);
    } else {
      setCarrito([...carrito, pastelUnidad]);
    }
  };

  const sumarPastel = (index) => {
    const newCarrito = [...carrito];
    newCarrito[index].count++;
    setCarrito(newCarrito);
  };

  const restarPastel = (index) => {
    const { count } = carrito[index];
    if (count === 1) {
      const newCarrito = [...carrito];
      newCarrito.splice(index, 1);
      setCarrito(newCarrito);
    } else {
      const newCarrito = [...carrito];
      newCarrito[index].count--;
      setCarrito(newCarrito);
    }
  };

  return (
    <PasteleriaContext.Provider
      value={{
        pastel,
        carrito,
        usuario,
        favoritos,
        pastelesLocalStorage,
        anadirCarrito,
        sumarPastel,
        restarPastel,
        setCarrito,
        setUsuario,
        setFavoritos,
      }}
    >
      {children}
    </PasteleriaContext.Provider>
  );
};

export { PasteleriaFunction, PasteleriaContext };
export default PasteleriaContext;
