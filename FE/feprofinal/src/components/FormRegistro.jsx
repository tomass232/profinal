import React, { useState } from "react";
import { postData } from "../servicios/fetch"; 
import "../styles/Registro.css";
import { useNavigate } from "react-router-dom";

function FormRegistro() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const objUsuario = {
      username: nombre,
      email: correo,
      password: clave
    };

    try {
      const respuesta = await postData("/crear_usuario/", objUsuario); 
      console.log("Respuesta:", respuesta);
      navigate("/home");
    } catch (error) {
      console.error("Error registrando el usuario:", error);
    }
  };

  return (
    <div className="registro-wrapper">
      <div className="registro-formulario">
        <h2>Registrate</h2>
        <form>
          <label>Nombre:</label>
          <input 
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label>Apellido:</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />

          <label>Correo:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <label>Clave:</label>
          <input  
            type="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />

          <button onClick={handleSubmit} type="button">{">"}</button>
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
