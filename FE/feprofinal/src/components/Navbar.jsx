import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <footer className="custom-navbar">
      <Link to="/campaña" className="navbar-item">Campañas</Link>
      <Link to="/home" className="navbar-item">Home</Link>
      <Link to="/registro" className="navbar-item">Regístrate!</Link>
    </footer>
  );
};

export default Navbar;
