import { useState } from "react"
import { postData } from "../servicios/fetch"
const AggCampania = () => {
    const [titulo_campana,setTituloCampana] = useState("")
    const [descripcion_campana,setDescripcionCampana] = useState("")
    const [fecha_campana,setFechaCampana] = useState("")
    const [ubicacion_campana,setUbicacionCampana] = useState("")
   
    const enviarCampana = async(e)=>{
        e.preventDefault()
        const objCampana = {
            "titulo_campana": titulo_campana,
            "descripcion_campana": descripcion_campana,
            "fecha_campana": fecha_campana,
            "ubicacion_campana": ubicacion_campana
        }
        const peticion = await postData('api/crear_campana/',objCampana)
        console.log(peticion);
    }
   
    return(
        <>
            <div>
                <input type="text" value={titulo_campana} onChange={(e) => setTituloCampana(e.target.value)} />

                <input type="text" value={descripcion_campana} onChange={(e) => setDescripcionCampana(e.target.value)} />

                <input type="date" value={fecha_campana} onChange={(e) => setFechaCampana(e.target.value)} />

                <input type="text" value={ubicacion_campana} onChange={(e) => setUbicacionCampana(e.target.value)} />

                <button onClick={enviarCampana}>Enviar</button>
            </div>
        </>
    )
}
export default AggCampania