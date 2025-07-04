import React, { useState } from "react";
import "../styles/inscripcion.css";
import { useLocation, useNavigate } from "react-router-dom";
import { postData } from "../servicios/fetch";

const FormInscripcion = () => {
  // obtiene los datos pasados desde el botón "Inscribirse"
  const location = useLocation();
  const navigate = useNavigate();
  const fechaCampaña = location.state?.fechaCampaña;
  const tituloCampaña = location.state?.tituloCampaña;
  const idCampaña = location.state?.idCampaña;

  // estado para guardar los datos del formulario
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    disponible: "",
  });

  // actualiza el estado cuando se escribe o cambia algún input
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "radio" ? value : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, disponible } = formData;

    if (!email.trim() || !password.trim() || !disponible.trim()) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor, completá todos los campos antes de continuar.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    // validación de formato de correo
    const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOK) {
      Swal.fire({
        title: "Correo inválido",
        text: "Ingresá un correo con formato válido (ej. ejemplo@dominio.com).",
        icon: "error",
        confirmButtonText: "Entendido",
      });
      return;
    }


    Swal.fire({
      title: "¡Inscripción confirmada!",
      text: "Gracias por confirmar tu participación.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      setFormData({ email: "", password: "", disponible: "" });
    });
  // cuando se envía el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // evita que se recargue la página
    console.log("Formulario enviado:", formData);

    const idUsuario = localStorage.getItem("idUsuario"); // hay que guardar esto al iniciar sesión
    const fechaInscripcion = new Date().toISOString();

    // objeto a enviar al backend
    const datosInscripcion = {
      usuario: idUsuario,
      campana: idCampaña,
      fecha_inscripcion: fechaInscripcion,
      calificacion: 0, 
    };

    const respuesta = await postData("api/crear_participaciones/", datosInscripcion);
    console.log("Participación enviada:", respuesta);

  };
  }

  return (
    <div className="background">
      <div className="overlay"></div>
      <div className="form-containers">
        <form className="volunteer-form" onSubmit={handleSubmit}>
          <p>Completa los siguientes datos para confirmar tu inscripción:</p>

          {/* input para email */}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Tu email..."
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* input para contraseña */}
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* pregunta personalizada con nombre y fecha */}
          <p>
            ¿Aceptas participar en la campaña{" "}
            <strong>{tituloCampaña || "seleccionada"}</strong> el{" "}
            <strong>
              {fechaCampaña
                ? new Date(fechaCampaña).toLocaleDateString()
                : "una fecha próxima"}
            </strong>
          </p>

          {/* selección de disponibilidad */}
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="disponible"
                value="sí"
                checked={formData.disponible === "sí"}
                onChange={handleChange}
                required
              />{" "}
              Sí
            </label>
            <label>
              <input
                type="radio"
                name="disponible"
                value="no"
                checked={formData.disponible === "no"}
                onChange={handleChange}
                required
              />{" "}
              No
            </label>
          </div>

          {/* botón para enviar */}
          <button className="animated-buttons">
            <span className="text">Confirmar inscripción</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormInscripcion;
