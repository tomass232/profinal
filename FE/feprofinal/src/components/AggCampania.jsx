import { useState } from "react";
import { postData } from "../servicios/fetch";
import Swal from "sweetalert2"; // ✅ import SweetAlert2
import "../styles/cards.css";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
// src/components/AggCampania.jsx
const AggCampania = () => {
  const navigate = useNavigate();

  // Estados para guardar los valores que el usuario escriba en el formulario
  const [titulo_campana, setTituloCampana] = useState("");
  const [descripcion_campana, setDescripcionCampana] = useState("");
  const [fecha_campana, setFechaCampana] = useState("");
  const [hora_campana, setHoraCampana] = useState("");
  const [ubicacion_campana, setUbicacionCampana] = useState("");

  const enviarCampana = async (e) => {
    e.preventDefault();

    if (
      titulo_campana.trim() === "" ||
      descripcion_campana.trim() === "" ||
      fecha_campana.trim() === "" ||
      hora_campana.trim() === "" ||
      ubicacion_campana.trim() === ""
    ) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor, completá todos los campos antes de crear la campaña.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    e.preventDefault(); // previene que se recargue la página

    // objeto con los datos que voy a enviar
    const objCampana = {
      titulo_campana,
      descripcion_campana,
      fecha_campana,
      hora_campana,
      ubicacion_campana,
    };

    const peticion = await postData("api/crear_campana/", objCampana);
    console.log(peticion);

    // 🔔 Alerta de éxito (solo si el backend responde correctamente)
    if (peticion && peticion.id) {
      Swal.fire({
        title: "¡Campaña creada!",
        text: "La campaña se ha registrado exitosamente.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Limpiar campos (opcional)
      setTituloCampana("");
      setDescripcionCampana("");
      setFechaCampana("");
      setHoraCampana("");
      setUbicacionCampana("");
      ubicacion_campana
    };

    // mando los datos al backend usando postData
    const respuesta = await postData("api/crear_campana/", objCampana);

    console.log("Respuesta del backend:", respuesta); // para revisar si se envió correctamente

    // redirige al formulario de inscripción si se recibió una fecha válida
    if (respuesta && respuesta.fecha_campana) {
      navigate("/inscripcion", {
        state: { fechaCampaña: respuesta.fecha_campana }
      });
    } else {
      console.error("No se recibió fecha_campana en la respuesta:", respuesta);
    }
  };

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
        type="time"
        value={hora_campana}
        onChange={(e) => setHoraCampana(e.target.value)}
      />
      <input
        type="text"
        placeholder="Ubicación"
        value={ubicacion_campana}
        onChange={(e) => setUbicacionCampana(e.target.value)}
      />

      <button type="submit" className="btn-crear">Crear campaña</button>
      {/* botón para enviar el formulario */}
      <button type="submit" className="btn-crear">
        Crear campaña
      </button>
    </form>
  );
};

export default AggCampania;
