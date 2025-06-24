import React, { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { postData } from "../servicios/fetch";
import Swal from "sweetalert2";          

export default function Login() {
  const [nombre, setNombre] = useState("");
  const [clave, setClave] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación para evitar campos vacíos
    if (nombre.trim() === "" || clave.trim() === "") {
      Swal.fire({
        title: "Campos vacíos",
        text: "Por favor, completá todos los campos.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    const objUsuario = {
      username: nombre,
      password: clave,
    };

    const respuesta = await postData("/api/login/", objUsuario);
    console.log(respuesta);

    if (respuesta.message) {
      localStorage.setItem("usuario", respuesta.idUsuario);
      localStorage.setItem("token", respuesta.token);
      navigate("/home");
    } else {
      Swal.fire({
        title: "Usuario o contraseña incorrectos",
        text: "Verificá tus datos e intentá de nuevo.",
        icon: "error",
        confirmButtonText: "Entendido",
      });
      console.log(respuesta);
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
          <form>
            <label>Nombre usuario:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <label>Password:</label>
            <input
              type="password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              required
            />
            <button type="text" onClick={handleSubmit}>
              Iniciar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
