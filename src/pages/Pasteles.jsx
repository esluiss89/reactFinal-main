import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import PasteleriaContex from "../PasteleriaContext";
import "./Pagestyles.css";
import { useEffect } from "react";

const PastelDesc = () => {
  const [pastel, setPastel] = useState(null);
  const { pasteles,anadirCarrito } = useContext(PasteleriaContex);
  const { id } = useParams();

  useEffect(() => {
    const getPastel = async () => {
      const result = pasteles.filter((obj) => obj.id === id);
      setPastel(result);
    };
    getPastel();
  }, [pasteles, id]);

  return (
    <>
      {pastel ? (
        <div>
          <div>
            <div className="cardContainerDesc" key={pastel[0].id}>
            <div className="containerImgDesc">
            <div>
                <img className="imgDesc" src={pastel[0].img} alt={pastel.name} />
              </div>
            </div>
          <div className = "containerDesc">
          <div className="">
                <h4 className="tituloPastel"> {pastel[0].name}</h4><hr />
                <p className="">{pastel[0].desc}</p>
                <hr />
                <p className=""><b>Ingredientes:</b></p>
                <ul>
                  {pastel[0].ingredients.map((ingredient, i) => (<li key={i}> {ingredient} </li> ))}
                </ul>
              </div>
              <div className="card-footerpastel">
                <hr /><h2 className="">price $ {pastel[0].price}</h2><hr />
                <div>
                  <button
                    className="buttonAnadir"
                    onClick={() => anadirCarrito(pastel[0])}> Añadir
                  </button>
                </div>
              </div>
          </div>
          </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PastelDesc;