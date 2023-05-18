import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [rut, setRut] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  const handleRegistro = (event) => {
    event.preventDefault();

    const nuevoUsuario = {
      nombre,
      apellido,
      rut,
      telefono,
      correo: email,
      contraseña: password,
      login: false,
      favorito: [],
    };

    const existeUsuario = usuarios.some((usuario) => usuario.correo === email);

    if (existeUsuario) {
      setErrorMessage("El correo electrónico ya está registrado.");
      setSuccessMessage("");
    } else {
      const newUser = {
        ...nuevoUsuario,
        userId: usuarios.length + 1,
      };

      setUsuarios([...usuarios, newUser]);

      setNombre("");
      setApellido("");
      setRut("");
      setTelefono("");
      setEmail("");
      setPassword("");
      setErrorMessage("");
      setSuccessMessage("Registro exitoso. Ahora puedes iniciar sesión.");
    }
  };

  return (
    <div className="container">
      <div className="registro-container">
        <h2>Registro</h2>
        <form onSubmit={handleRegistro}>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
            required
          />
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Apellido"
            required
          />
          <input
            type="text"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            placeholder="RUT"
            required
          />
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Teléfono"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
          <button type="submit">Registrarse</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
        {successMessage && <p>{successMessage}</p>}
        <p>
          ¿Ya tienes una cuenta? <Link to="/">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
}
