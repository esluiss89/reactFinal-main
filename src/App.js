import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Home from "./pages/Home";
import PastelDesc from "./pages/Pasteles";
import DetallePedido from "./pages/Cart";
import Nav from "./components/Navbar";
import Registro from "./components/Registro";
import Publicar from "./components/Publicaciones";
import Perfil from "./components/Perfil";
import { PasteleriaFunction } from "./PasteleriaContext";
import { AuthProvider } from "./AuthContext";
import Dashboard from "./pages/Dashboard";
import Favoritos from "./components/Favoritos";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <PasteleriaFunction>
          <Nav />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/home" element={<Home />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/pastel/:id" element={<PastelDesc />} />
            <Route path="/publicaciones" element={<Publicar />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/carrito" element={<DetallePedido />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/favoritos" element={<Favoritos />} />
          </Routes>
        </PasteleriaFunction>
      </AuthProvider>
    </Router>
  );
}
