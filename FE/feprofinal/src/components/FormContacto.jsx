import React, { useState } from "react";
import { postData } from "../servicios/fetch"; 
import "../styles/contacto.css"; 

function FormContacto() {
  // estado para guardar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });

  // función que actualiza el estado cuando el usuario escribe en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // evita que se recargue la página
    try {
      // envío los datos al backend usando postData
      await postData("contacto/", formData);
      alert("Mensaje enviado con éxito");
      // limpio el formulario después de enviar
      setFormData({ nombre: "", correo: "", mensaje: "" });
    } catch (error) {
      alert("Hubo un error al enviar el mensaje");
      console.error(error);
    }
  };

  return (
    <div className="pagina-contacto">
      <div className="contacto-container">
        <h2 className="contacto-titulo">Contáctanos</h2>
        <form className="contacto-formulario" onSubmit={handleSubmit}>
          {/* input para nombre */}
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          {/* input para correo */}
          <input
            type="email"
            name="correo"
            placeholder="Tu correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
          {/* textarea para mensaje */}
          <textarea
            name="mensaje"
            placeholder="Tu mensaje"
            rows="5"
            value={formData.mensaje}
            onChange={handleChange}
            required
          />
          {/* botón para enviar */}
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default FormContacto;
