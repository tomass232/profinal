import React, { useState } from "react";
import { postData } from "../servicios/fetch"; 
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
    try {
      await postData("contacto/", formData);
      alert("Mensaje enviado con éxito");
      setFormData({ nombre: "", correo: "", mensaje: "" });
    } catch (error) {
      alert("Hubo un error al enviar el mensaje");
      console.error(error);
    }
  };

  return (
    <div className="contacto-container">
      <h2 className="contacto-titulo">Contáctanos</h2>
      <form className="contacto-formulario" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Tu nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Tu correo"
          value={formData.correo}
          onChange={handleChange}
          required
        />
        <textarea
          name="mensaje"
          placeholder="Tu mensaje"
          rows="5"
          value={formData.mensaje}
          onChange={handleChange}
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default FormContacto;
