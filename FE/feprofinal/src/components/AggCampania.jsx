import { useState } from "react"
import { postData } from "../servicios/fetch"
import '../styles/cards.css'

const AggCampania = () => {
  const [titulo_campana, setTituloCampana] = useState("")
  const [descripcion_campana, setDescripcionCampana] = useState("")
  const [fecha_campana, setFechaCampana] = useState("")
  const [ubicacion_campana, setUbicacionCampana] = useState("")

  const enviarCampana = async (e) => {
    e.preventDefault()
    const objCampana = {
      titulo_campana,
      descripcion_campana,
      fecha_campana,
      ubicacion_campana
    }
    const peticion = await postData('api/crear_campana/', objCampana)
    console.log(peticion)
  }

  return (
    <form className="form-crear-campaña" onSubmit={enviarCampana}>
      <h5>Crear nueva campaña</h5>

      <input
        type="text"
        placeholder="Título"
        value={titulo_campana}
        onChange={(e) => setTituloCampana(e.target.value)}
      />

      <input
        type="text"
        placeholder="Descripción"
        value={descripcion_campana}
        onChange={(e) => setDescripcionCampana(e.target.value)}
      />

      <input
        type="date"
        value={fecha_campana}
        onChange={(e) => setFechaCampana(e.target.value)}
      />

      <input
        type="text"
        placeholder="Ubicación"
        value={ubicacion_campana}
        onChange={(e) => setUbicacionCampana(e.target.value)}
      />

      <button type="submit" className="btn-crear">Crear campaña</button>
    </form>
  )
}

export default AggCampania
