import React, { useEffect, useState } from 'react'
import FormCampaña from '../components/FormCampaña'
import Footer from "../components/Footer"
import Navbar from '../components/Navbar'
import AggCampania from '../components/AggCampania'
import { getData } from '../servicios/fetch'
import Cards from '../components/Cards'


function Campaña() {
  const [campanias, setCampanaias] = useState([])

  useEffect(() => {
    const traeCampanas = async () => {
      const peticion = await getData('api/crear_campana/')
      setCampanaias(peticion)
    }
    traeCampanas()
  }, []);


  return (
    <>
    <Navbar />
    <div className="contenido-campanas">
      <div className="lado-formulario">
        <AggCampania />
      </div>
      <div className="lado-cards">
        <Cards data={campanias} />
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Campaña;
