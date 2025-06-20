import React from 'react'
import PerfilUsuario from '../components/PerfilUsuario'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BotonComponente from '../components/BotonComponente'

const Perfil = () => {
  return (
    <div>
      <Navbar />
      <PerfilUsuario />
      <BotonComponente />
      <Footer />
    </div>
  )
}

export default Perfil;