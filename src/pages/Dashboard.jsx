import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import "./Pagestyles.css";

const Dashboard = () => {
  const { usuario, cerrarSesion } = useContext(AuthContext);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <h2>{usuario ? "Usuario existe" : "No existe"}</h2>
      <button onClick={cerrarSesion}>Logout</button>
    </div>
  );
};

export default Dashboard;
