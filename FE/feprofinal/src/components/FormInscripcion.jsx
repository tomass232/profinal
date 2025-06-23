import React, { useState } from "react";
import "../styles/inscripcion.css";
import { Form } from "react-router-dom";

const FormInscripcion = () => {
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

  // cuando se envía el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // evita que se recargue la página
    console.log("Formulario enviado:", formData); // por ahora solo imprimo los datos
  };

  return (
    <div className="background">
      <div className="overlay"></div>
      <div className="form-container">
        <form className="volunteer-form" onSubmit={handleSubmit}>
          <p>
            Completa los siguientes datos para confirmar tu inscripción:
          </p>

          {/* input para email */}
          <label htmlFor="email">Usuario:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Tu usuario..."
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

          {/* pregunta para saber si está disponible */}
          <p>¿Aceptas estar disponible para participar el 20 de julio de 2025?</p>
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

          {/* botón para enviar el formulario con diseño SVG */}
          <button class="animated-button">
            <svg xmlns="http://www.w3.org/2000/svg" class="arr-2" viewBox="0 0 24 24">
              <path
                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
              ></path>
            </svg>
            <span class="text">Confirmar inscripcion</span>
            <span class="circle"></span>
            <svg xmlns="http://www.w3.org/2000/svg" class="arr-1" viewBox="0 0 24 24">
              <path
                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
              ></path>
            </svg>
          </button>

        </form>
      </div>
    </div>
  );
};

export default FormInscripcion;
