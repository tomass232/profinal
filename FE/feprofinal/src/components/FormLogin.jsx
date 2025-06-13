import React, { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { postData } from "../servicios/fetch"; 

export default function Login() {
  const [nombre, setNombre] = useState("");
  const [clave, setClave] = useState("");

   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
        const objUsuario = {
      "username": nombre,
      "password": clave
    }
     const respuesta = await postData("/api/login/", objUsuario); 
      console.log(respuesta);
     if (respuesta.message) {
       navigate("/home");
       console.log(respuesta);
     }else{ 
        alert("Usuario o contraseña incorrectos");
        console.log(respuesta); 
     }
    }


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
            <button type="text" onClick={handleSubmit}>Iniciar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
