import React from 'react'
import FormInscripcion from "../components/FormInscripcion";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import BotonComponente from '../components/BotonComponente';
const Inscripcion = () => {
  return (
    <div>
      <Navbar />
      <FormInscripcion />
      <BotonComponente />
      <Footer />
    </div>
  )
}
export default Inscripcion;