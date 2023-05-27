import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Inicio.css";
import { AuthContext } from "../AuthContext";
import { PasteleriaContext } from "../PasteleriaContext";
import axios from "axios";

export default function Inicio() {
  const { iniciarSesion } = useContext(AuthContext);
  const { setUsuario } = useContext(PasteleriaContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get("/usuarios.json");
      const usuarios = response.data;

      const storedUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      const user = usuarios.find((usuario) => usuario.correo === email);

      if (user && user.contraseña === password) {
        iniciarSesion(user);
        setUsuario(user);
        console.log("Inicio de sesión exitoso");
        setErrorMessage("");
        navigate("/home");
      } else if (storedUsuarios.length > 0) {
        const storedUser = storedUsuarios.find((usuario) => usuario.correo === email);
        if (storedUser && storedUser.contraseña === password) {
          iniciarSesion(storedUser);
          setUsuario(storedUser);
          console.log("Inicio de sesión exitoso");
          setErrorMessage("");
          navigate("/home");
        } else {
          setErrorMessage("Credenciales inválidas. Inténtalo de nuevo.");
        }
      } else {
        setErrorMessage("Credenciales inválidas. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      setErrorMessage("Error al cargar usuarios. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <div className="container2">
      <div className="login-container2">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
          <button type="submit">Iniciar sesión</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
        <p>
          ¿No tienes una cuenta?{" "}
          <Link to="/registro">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}
