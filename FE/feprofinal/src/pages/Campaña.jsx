import React, { useEffect, useState } from 'react'
import FormCampaña from '../components/FormCampaña'
import Footer from "../components/Footer"
import Navbar from '../components/Navbar'
import { getData } from '../servicios/fetch'
import Cards from '../components/Cards'
import "../styles/campanias.css"



function Campaña() {
  const [campanias, setCampanaias] = useState([])

  useEffect(() => {
    const traeCampanas = async () => {
      const peticion = await getData('api/crear_campana/')
      setCampanaias(peticion)
      console.log(campanias);
      console.log(peticion);
    }
    traeCampanas()
  }, []);

  return (
<>
<Navbar />
    <div className="contenido-campanas">
      <div className="lado-formulario">
      <FormCampaña />
      </div>
      <div className="lado-cards">
        <Cards/>
      </div>
    </div>
     
      <Footer />
    </>
  );
}

export default Campaña;
