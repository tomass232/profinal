import { useState, useEffect } from "react";
import { postData, getData } from "../servicios/fetch";
import Swal from "sweetalert2";
import "../styles/cards.css";
import { useNavigate } from "react-router-dom";

const AggCampania = () => {
  const navigate = useNavigate();

  const [titulo_campana, setTituloCampana] = useState("");
  const [descripcion_campana, setDescripcionCampana] = useState("");
  const [fecha_campana, setFechaCampana] = useState("");
  const [hora_campana, setHoraCampana] = useState("");
  const [ubicacion_campana, setUbicacionCampana] = useState("");
  const [comunidades, setComunidades] = useState([]);
  const [comunidadSeleccionada, setComunidadSeleccionada] = useState(""); 

  useEffect(() => {
    const cargarComunidades = async () => {
      try {
        const data = await getData("api/comunidades/");
        setComunidades(data);
      } catch (error) {
          console.error("Error al cargar comunidades:", error);
      }
    };

    cargarComunidades();
  }, []);

  const enviarCampana = async (e) => {
    e.preventDefault();

    if (
      titulo_campana.trim() === "" ||
      descripcion_campana.trim() === "" ||
      fecha_campana.trim() === "" ||
      hora_campana.trim() === "" ||
      ubicacion_campana.trim() === "" ||
      comunidadSeleccionada === ""
    ) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor, completá todos los campos antes de crear la campaña.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    const objCampana = {
      titulo_campana,
      descripcion_campana,
      fecha_campana,
      hora_campana,
      ubicacion_campana,
      comunidad: comunidadSeleccionada,
    };

    const respuesta = await postData("api/crear_campana/", objCampana);
    console.log("Respuesta del backend:", respuesta);

    if (respuesta && respuesta.id) {
      Swal.fire({
        title: "¡Campaña creada!",
        text: "La campaña se ha registrado exitosamente.",
        icon: "success",
        confirmButtonText: "OK",
      });

      setTituloCampana("");
      setDescripcionCampana("");
      setFechaCampana("");
      setHoraCampana("");
      setUbicacionCampana("");
      setComunidadSeleccionada("");

      if (respuesta.fecha_campana) {
        navigate("/inscripcion", {
          state: { fechaCampaña: respuesta.fecha_campana },
        });
      }
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

      <select
        value={comunidadSeleccionada}
        onChange={(e) => setComunidadSeleccionada(e.target.value)}
      >
        <option value="">Seleccione una comunidad</option>
        {comunidades.map((comunidad) => (
          <option key={comunidad.id} value={comunidad.id}>
            {comunidad.nombre}
          </option>
        ))}
        <option value="">San José</option>
        {comunidades.map((comunidad) => (
          <option key={comunidad.id} value={comunidad.id}>
            {comunidad.nombre}
          </option>
        ))}
        <option value="">Monteverde</option>
        {comunidades.map((comunidad) => (
          <option key={comunidad.id} value={comunidad.id}>
            {comunidad.nombre}
          </option>
        ))}
        <option value="">Cartago</option>
        {comunidades.map((comunidad) => (
          <option key={comunidad.id} value={comunidad.id}>
            {comunidad.nombre}
          </option>
        ))}
      </select>

      <button type="submit" className="btn-crear">
        Crear campaña
      </button>
    </form>
  );
};

export default AggCampania;
