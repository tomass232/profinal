import React, { useState } from "react";
import "../styles/inscripcion.css";

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    disponible: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "radio" ? value : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
  };

  return (
    <div className="form-container">
      <form className="volunteer-form" onSubmit={handleSubmit}>
        <p>Completá los siguientes datos para confirmar tu inscripción:</p>

        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <p>Acepto estar disponible para participar el día 20 de julio de 2025</p>
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

        <button type="submit" className="arrow-button">{">"}</button>
      </form>
    </div>
  );
};

export default VolunteerForm;
