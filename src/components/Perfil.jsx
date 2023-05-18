import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Components.css";

const Perfil = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("./usuarios.json");
        const users = response.data;
        const user = users.find((user) => user.login === true); // Buscar el usuario que ha iniciado sesión
        
        if (user) {
          setUserInfo(user);
        }
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="profile">
      <h2>Perfil de Usuario</h2>
      {userInfo && (
        <div className="user-info">
          <p>Nombre: {userInfo.nombre}</p>
          <p>Apellido: {userInfo.apellido}</p>
          <p>RUT: {userInfo.rut}</p>
          <p>Teléfono: {userInfo.telefono}</p>
          <p>Correo: {userInfo.correo}</p>
        </div>
      )}
    </div>
  );
};


export default Perfil;
