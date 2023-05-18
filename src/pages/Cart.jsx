import React from "react";
import { useContext } from "react";
import PasteleriaContext from "../PasteleriaContext";
import { useEffect } from "react";

const DetallePedido = () => {
  const { carrito, sumarPastel, restarrPastel } = useContext(PasteleriaContext);
  const total = carrito.reduce(
    (a, { count, price }) => a + price * count,
    0
  );

  useEffect(() => { }, [carrito]);

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
                  <h6 className="item4">
                    ${(product.price * product.count)}
                  </h6>
                  <button
                    className="menos"
                    onClick={() => restarrPastel(i)}>-
                  </button>
                  <h5 className="contador">{product.count}</h5>
                  <button
                    className="mas"
                    onClick={() => sumarPastel(i)}>+
                  </button>
                </div>
              </div>
            ))}
            <h2>Total: ${(total)}</h2>
            <button className="buttonPagar">Ir a Pagar </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetallePedido;