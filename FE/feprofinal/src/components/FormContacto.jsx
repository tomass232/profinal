import React, { useState } from "react";
import { postData } from "../servicios/fetch";
import Swal from "sweetalert2";
import "../styles/contacto.css";

function FormContacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, correo, mensaje } = formData;

    if (nombre.trim() === "" || correo.trim() === "" || mensaje.trim() === "") {
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor, completá todos los campos.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    // Validación del formato de correo
    const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    if (!emailOK) {
      Swal.fire({
        title: "Correo inválido",
        text: "Ingresá un correo válido (ej: ejemplo@dominio.com).",
        icon: "error",
        confirmButtonText: "Entendido",
      });
      return;
    }

    try {
      await postData("contacto/", formData);

      Swal.fire({
        title: "Mensaje enviado",
        text: "Gracias por contactarnos. Te responderemos pronto.",
        icon: "success",
        confirmButtonText: "OK",
      });

      setFormData({ nombre: "", correo: "", mensaje: "" });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Hubo un error al enviar el mensaje. Intentá de nuevo más tarde.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <div className="pagina-contacto">
      <div className="contacto-container">
        <h2 className="contacto-titulo">Contáctanos</h2>
        <form className="contacto-formulario" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          <input
            type="email"
            name="correo"
            placeholder="Tu correo"
            value={formData.correo}
            onChange={handleChange}
          />
          <textarea
            name="mensaje"
            placeholder="Tu mensaje"
            rows="5"
            value={formData.mensaje}
            onChange={handleChange}
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default FormContacto;
