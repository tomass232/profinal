import React, { useState } from "react";
import { postData, postUser } from "../servicios/fetch";
import Swal from "sweetalert2"; 
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

    if (
      nombre.trim() === "" ||
      apellido.trim() === "" ||
      correo.trim() === "" ||
      clave.trim() === ""
    ) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor, completá todos los campos.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    const objUsuario = {
      username: nombre,
      email: correo,
      password: clave,
    };

    try {
      const respuesta = await postUser("api/crear_usuario/", objUsuario);
      console.log("Respuesta:", respuesta);

      Swal.fire({
        title: "¡Registro exitoso!",
        text: "Tu cuenta ha sido creada correctamente.",
        icon: "success",
        confirmButtonText: "Ir al inicio",
      }).then(() => {
        navigate("/home");
      });

    } catch (error) {
      console.error("Error registrando el usuario:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo completar el registro. Intentá de nuevo más tarde.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
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
