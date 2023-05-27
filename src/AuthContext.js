import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  const iniciarSesion = (user) => {
    setUsuario(user);
    localStorage.setItem("usuario", JSON.stringify(user));
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, setUsuario, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, AuthContext, useAuth };

