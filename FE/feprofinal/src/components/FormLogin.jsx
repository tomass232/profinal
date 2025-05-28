import React, { useState } from "react";
import "../styles/login.css";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (correo === "tomas@gmail.com" && contrasena === "mari") {
      setMensaje("Inicio de sesión exitoso");
    } else {
      setMensaje("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-image">
          <img
            src="https://thumbs.dreamstime.com/b/voluntarios-que-sirven-la-comida-para-gente-pobre-126480073.jpg"
            alt="Voluntariado"
          />
        </div>
        <div className="login-form">
          <h2>Inicia sesión</h2>
          <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
            <label>Password:</label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
            <button type="submit">Iniciar</button>
            {mensaje && <p className="mensaje">{mensaje}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
