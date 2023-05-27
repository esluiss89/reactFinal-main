import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import "./perfil.css";

const Perfil = () => {
  const { usuario, setUsuario } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(usuario);
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      setEditMode(false);
      setUsuario(userInfo); // Actualiza el usuario en el contexto
      localStorage.setItem("usuario", JSON.stringify(userInfo)); // Guarda el usuario en el localStorage
      console.log("Cambios guardados correctamente");
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  return (
    <div className="profile">
      <h2>Perfil de Usuario</h2>
      {userInfo && (
        <div className="shared-style">
          <div className="container bg-white p-3">
            <p className="mb-2">
              <strong>Nombre:</strong>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="nombre"
                  value={userInfo.nombre}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                userInfo.nombre
              )}
            </p>
            <p className="mb-2">
              <strong>Apellido:</strong>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="apellido"
                  value={userInfo.apellido}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                userInfo.apellido
              )}
            </p>
            <p className="mb-2">
              <strong>RUT:</strong>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="rut"
                  value={userInfo.rut}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                userInfo.rut
              )}
            </p>
            <p className="mb-2">
              <strong>Teléfono:</strong>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="telefono"
                  value={userInfo.telefono}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                userInfo.telefono
              )}
            </p>
            <p className="mb-2">
              <strong>Dirección:</strong>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="direccion"
                  value={userInfo.direccion}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                userInfo.direccion
              )}
            </p>
            <p className="mb-2"><strong>Correo:</strong> {userInfo.correo}</p>
            {editMode ? (
              <button onClick={handleSaveChanges} className="btn btn-primary me-2">Guardar Cambios</button>
            ) : (
              <button onClick={() => setEditMode(true)} className="btn btn-primary me-2">Editar</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;
