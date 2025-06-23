import React, { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { postData } from "../servicios/fetch"; 

export default function Login() {
  // estados para guardar el nombre de usuario y la contraseña
  const [nombre, setNombre] = useState("");
  const [clave, setClave] = useState("");

  // para poder navegar a otra página después del login
  const navigate = useNavigate();

  // función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // para que no recargue la página
    
    // objeto con los datos que se van a enviar al backend
    const objUsuario = {
      "username": nombre,
      "password": clave
    };

    // hago la petición POST para loguear
    const respuesta = await postData("/api/login/", objUsuario); 
    console.log(respuesta);

    // si la respuesta tiene mensaje, significa que el login fue exitoso
    if (respuesta.message) {
      // guardo el id de usuario y token en localStorage para usarlos después
      localStorage.setItem("usuario", respuesta.idUsuario);
      localStorage.setItem("token", respuesta.token);
      
      // redirijo a la página home
      navigate("/home");
    } else { 
      // si no, muestro alerta y la respuesta para saber qué pasó
      alert("Usuario o contraseña incorrectos");
      console.log(respuesta); 
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-image">
          {/* imagen para la página de login */}
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
            {/* botón que ejecuta handleSubmit cuando se hace click */}
            <button type="text" onClick={handleSubmit}>Iniciar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

