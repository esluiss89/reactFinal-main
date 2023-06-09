import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [rut, setRut] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [direccion, setDireccion] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const usuariosGuardados = localStorage.getItem("usuarios");
    if (usuariosGuardados) {
      const usuariosParseados = JSON.parse(usuariosGuardados);
      setUsuarios(usuariosParseados);
    }
  }, []);

  const handleRegistro = (event) => {
    event.preventDefault();

    // Validar la longitud y los requisitos de la contraseña
    if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      setErrorMessage("La contraseña debe tener al menos 8 caracteres y contener letras mayúsculas, letras minúsculas, números.");
      setSuccessMessage("");
      return;
    }

    const nuevoUsuario = {
      nombre,
      apellido,
      rut,
      telefono,
      direccion,
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

      const updatedUsuarios = [...usuarios, newUser];
      setUsuarios(updatedUsuarios);

      localStorage.setItem("usuarios", JSON.stringify(updatedUsuarios));

      setNombre("");
      setApellido("");
      setRut("");
      setTelefono("");
      setDireccion("");
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
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              placeholder="Apellido"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              placeholder="RUT"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Teléfono"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Dirección"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Registrarse
          </button>
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
