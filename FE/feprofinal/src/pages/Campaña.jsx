import React, { useEffect, useState } from 'react'
import FormCampaña from '../components/FormCampaña'
import Footer from"../components/Footer"
import Navbar from '../components/Navbar'
import AggCampania from '../components/AggCampania'
import { getData } from '../servicios/fetch'
import Cards from '../components/Cards'
import "../styles/campanias.css"


function Campaña() {
  const [campanias,setCampanaias] = useState([])

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
      <FormCampaña />

      <div className='cont-camps'>
        <Cards data={campanias} />
      </div>
      <AggCampania/>
      <Footer />
    </>
  )
}

export default Campaña; 
