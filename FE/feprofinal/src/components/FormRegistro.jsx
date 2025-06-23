import React, { useState } from "react";
import { postData } from "../servicios/fetch"; 
import "../styles/Registro.css";
import { useNavigate } from "react-router-dom";

function FormRegistro() {
  // estados para guardar cada dato del formulario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");

  // para navegar después de registrarse
  const navigate = useNavigate();

  // función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // para que no recargue la página
    
    // objeto con los datos que vamos a enviar al backend
    const objUsuario = {
      username: nombre,
      email: correo,
      password: clave
    };

    try {
      // hago la petición para crear usuario
      const respuesta = await postData("api/crear_usuario/", objUsuario); 
      console.log("Respuesta:", respuesta);
      // si todo salió bien, redirijo a home
      navigate("/home");
    } catch (error) {
      // si hay error, lo muestro en consola
      console.error("Error registrando el usuario:", error);
    }
  };

  return (
    <div className="registro-wrapper">
      <div className="registro-formulario">
        <h2>Registrate</h2>
        <form>
          {/* input para nombre */}
          <label>Nombre:</label>
          <input 
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          {/* input para apellido */}
          <label>Apellido:</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />

          {/* input para correo */}
          <label>Correo:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          {/* input para contraseña */}
          <label>Clave:</label>
          <input  
            type="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />

          {/* botón para enviar el formulario */}
          <button onClick={handleSubmit} type="button">{">"}</button>
        </form>
      </div>

      {/* imagen decorativa al lado del formulario */}
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
