import React, { useState } from "react";
import { postData } from "../servicios/fetch";
import Swal from "sweetalert2";
import "../styles/comunidades.css";

const AggComunidad = () => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const token = localStorage.getItem("access");
    
    const [comunidadId, setComunidadId] = useState(1); 
    const handleSubmit = async (e) => {
    //   const datos = {
    //     titulo_campana,
    //     descripcion_campana,
    //     fecha_campana,
    //     comunidad: comunidadId
    //   }
    e.preventDefault();

    if (!nombre || !descripcion || !ubicacion) { 
      Swal.fire("Campos incompletos", "Llená todos los campos", "warning");
      return;
    }
    const nuevaComunidad = { nombre, descripcion, ubicacion };

    try {
      const peticion = await postData(`api/comunidades/`, nuevaComunidad);
      console.log(peticion);
      Swal.fire("Éxito", "Comunidad creada correctamente", "success");
      setNombre("");
      setDescripcion("");
      setUbicacion("");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message || "No se pudo crear la comunidad", "error");
    }
  };

  return (
    <div className="form-container">
      <h2>Agregar Comunidad</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>  
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label>Descripción:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <label>Ubicación:</label>
        <input
          type="text"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
        />

        <button type="button" onClick={handleSubmit}>Guardar Comunidad</button>
      </form>
    </div>
  );
};

export default AggComunidad;



