import { createContext, useState, useEffect } from "react";

const PasteleriaContext = createContext();

const PasteleriaFunction = ({ children }) => {
  const [pastel, setPastel] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    fetchDataPasteles();
  }, []);

  const fetchDataPasteles = async () => {
    const data = await fetch("/pasteles.json");
    const pastel = await data.json();
    setPastel(pastel);
  };

  const anadirCarrito = ({ id, price, name, img }) => {
    const idPastel = carrito.findIndex((i) => i.id === id);
    const pastelUnidad = { id, price, name, img, count: 1 };

    if (idPastel >= 0) {
      carrito[idPastel].count++;
      setCarrito([...carrito]);
    } else {
      setCarrito([...carrito, pastelUnidad]);
    }
  };

  const sumarPastel = (i) => {
    carrito[i].count++;
    setCarrito([...carrito]);
  };

  const restarPastel = (i) => {
    const { count } = carrito[i];
    if (count === 1) {
      carrito.splice(i, 1);
    } else {
      carrito[i].count--;
    }
    setCarrito([...carrito]);
  };

  return (
    <PasteleriaContext.Provider
      value={{
        pastel,
        carrito,
        usuario,
        anadirCarrito,
        sumarPastel,
        restarPastel,
        setUsuario,
      }}
    >
      {children}
    </PasteleriaContext.Provider>
  );
};

export { PasteleriaFunction };

export default PasteleriaContext;
