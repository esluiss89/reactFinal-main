import { NavLink } from "react-router-dom";
import "./Components.css";
import { useContext } from "react";
import PasteleriaContext from "../PasteleriaContext";

export default function Nav() {
  const { carrito } = useContext(PasteleriaContext);
  const total = carrito.reduce((a, { count, price }) => a + price * count, 0);

  return (
    <div className="navbar">
      <div>
        <NavLink to="/home">
          <img
            src="https://i.postimg.cc/KzgQL0wP/pastel.png"
            width="40"
            height="40"
            alt="Logo de la Pasteleria"
          />{" "}
          ¡Pasteleria Delicias Cecy!
        </NavLink>
      </div>
      <div className="options">
        <NavLink to="/home" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/publicaciones" className="nav-link">
          Publicar
        </NavLink>
        <NavLink to="/perfil" className="nav-link">
          Perfil
        </NavLink>
        <NavLink to="/" className="nav-link">
          Iniciar
        </NavLink>
        <NavLink to="home" className="nav-link">
          Cerrar Cesion
        </NavLink>
      </div>
      <div className="carrito">
        <NavLink to="/carrito">
          <h1 className="mb-0">
            <img
              src="https://i.postimg.cc/6qfrLg0v/anadir-al-carrito.png"
              width="30"
              height="30"
              alt="Icono del carrito"
            />
            {""} Carrito: ${total}
          </h1>
        </NavLink>
      </div>
    </div>
  );
}


