import React, { useState } from "react";
import "../styles/Registro.css";

function FormRegistro() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Formulario enviado");
  };

  return (
    <div className="registro-wrapper">
      <div className="registro-formulario">
        <h2>Registrate</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input 
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label>Apellido: </label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />

          <label>Correo: </label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <button type="submit">{">"}</button>
        </form>
      </div>

      <div className="registro-imagen">
        <img
          src="https://images.unsplash.com/photo-1603298108410-e6f28ad2708d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFycmlvfGVufDB8fDB8fHww"
          alt="Vista aérea"
        />
      </div>
    </div>
  );
}

export default FormRegistro;
