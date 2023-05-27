import React, { useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { PasteleriaContext } from "../PasteleriaContext";
import { AuthContext } from "../AuthContext";

const Cart = () => {
  const { carrito, sumarPastel, restarPastel, setCarrito } = useContext(PasteleriaContext);
  const { usuario } = useContext(AuthContext);
  const total = carrito.reduce((a, { count, price }) => a + price * count, 0);
  const navigate = useNavigate();

  const guardarCarrito = useCallback(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    const storedCarrito = localStorage.getItem("carrito");
    if (storedCarrito) {
      const parsedCarrito = JSON.parse(storedCarrito);
      setCarrito(parsedCarrito);
    }
  }, [setCarrito]);

  useEffect(() => {
    guardarCarrito();
  }, [carrito, guardarCarrito]);

  const handlePagar = () => {
    if (usuario) {
      if (carrito.length > 0) {
        alert("Redireccionando a tu medio de pago");
      } else {
        alert("No tienes pasteles seleccionados para pagar");
      }
    } else {
      alert("Debes iniciar sesión para pagar");
      navigate("/"); // Redirige al usuario al componente Inicio.jsx
    }
  };

  return (
    <>
      <div className="containerCarrito">
        <div className="containerDetalles">
          <h5 className="tituloCarrito">Detalles del Pedido: </h5>
          <div className="productos">
            {carrito.map((product, i) => (
              <div key={i} className="unidad">
                <div className="item">
                  <img src={product.img} style={{ width: 50 }} alt="" />
                  <h6 className="item2">{product.name}</h6>
                </div>
                <div className="item3">
                  <h6 className="item4">${product.price * product.count}</h6>
                  <button className="menos" onClick={() => restarPastel(i)}>
                    -
                  </button>
                  <h5 className="contador">{product.count}</h5>
                  <button className="mas" onClick={() => sumarPastel(i)}>
                    +
                  </button>
                </div>
              </div>
            ))}
            <h2>Total: ${total}</h2>
            <button className="buttonPagar" onClick={handlePagar}>
              Ir a Pagar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
