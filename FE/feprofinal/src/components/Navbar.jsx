import React from 'react';
import { Link } from 'react-router-dom'; // Importas Link
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <footer className="custom-navbar">
      <Link to="/inscripcion" className="navbar-item">Incríbete!</Link>
      <Link to="/login" className="navbar-item">Inicia Sesión!</Link>
      <Link to="/registro" className="navbar-item">Regístrate!</Link>
    </footer>
  );
};

export default Navbar;
