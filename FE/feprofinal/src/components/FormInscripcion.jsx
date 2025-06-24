import React, { useState } from "react";
import Swal from "sweetalert2";
import "../styles/inscripcion.css";

const FormInscripcion = () => {
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

    console.log("Formulario enviado:", formData);

    Swal.fire({
      title: "¡Inscripción confirmada!",
      text: "Gracias por confirmar tu participación.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      setFormData({ email: "", password: "", disponible: "" });
    });

  };

  return (
    <div className="background">
      <div className="overlay"></div>
      <div className="form-container">
        <form className="volunteer-form" onSubmit={handleSubmit}>
          <p>Completa los siguientes datos para confirmar tu inscripción:</p>

          <label htmlFor="email">Usuario:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Tu usuario..."
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
          />

          <p>¿Aceptás estar disponible para participar el 20 de julio de 2025?</p>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="disponible"
                value="sí"
                checked={formData.disponible === "sí"}
                onChange={handleChange}
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
              />{" "}
              No
            </label>
          </div>

          <button className="animated-button" type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" className="arr-2" viewBox="0 0 24 24">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
            </svg>
            <span className="text">Confirmar inscripción</span>
            <span className="circle"></span>
            <svg xmlns="http://www.w3.org/2000/svg" className="arr-1" viewBox="0 0 24 24">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormInscripcion;
