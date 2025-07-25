import React from 'react'
import "../styles/footer.css";
import { Link } from 'react-router-dom';
import BotonComponente from './BotonComponente';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <Link to="https://www.facebook.com/business/ads/pricing" className="footer-item" target='_blank'>No running advertising costs</Link>
      <Link to="/perfil" className="footer-item" target='_blank' >Mi perfil</Link>
      <Link to="https://www.stessa.com/blog/free-rental-property-listing/" className="footer-item" target='_blank' >Free to successful rental</Link>
      <Link to="/contacto" className="footer-item">Contáctenos</Link>
      <Link to="/registro" className="footer-item">Regístrate!</Link>
      <BotonComponente/>
    </footer>
  );
};



export default Footer;