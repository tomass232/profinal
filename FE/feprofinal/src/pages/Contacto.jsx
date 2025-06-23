import React from 'react'
import FormContacto from '../components/FormContacto'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import BotonComponente from '../components/BotonComponente'

function Contacto() {
  return (
    <div>
      <Navbar />
      <FormContacto />
      <BotonComponente />
      <Footer />
    </div>
  )
}

export default Contacto