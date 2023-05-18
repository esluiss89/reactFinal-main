import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Components.css";
import ContextPasteleria from "../PasteleriaContext";

const CardPastel = () => {
  const { pastel, anadirCarrito } = useContext(ContextPasteleria);
  const navigate = useNavigate();

  return (
    <>
      <div className="contenedorPastel">
        {pastel?.map((pastel) => (
          <div key={pastel.id} >
            <div className="card">
              <img className="card-img-top" src={pastel.img} alt={pastel.name} />
              <div className="card-body">
                <h5 className="tituloPastel">
                  {pastel.name}
                </h5>
                <hr /> <p>Ingredientes:</p>
                <div>
                  {pastel.ingredients.map((ingredient, i) => (
                    <li key={i}> {ingredient} </li>
                  ))}
                </div>
              </div>
              <div className= "footer">
                <h2 className="price">$ {pastel.price}</h2>
                <div className="buttons">
                  <button
                    className="buttonVerMas" onClick={() => navigate(`/pizzas/${pastel.id}`)}>  Ver más... 
                  </button>
                  <button
                    className="buttonAnadir"
                    onClick={() => anadirCarrito(pastel)}> Añadir
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardPastel;