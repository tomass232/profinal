import React from "react";
import "../styles/Home.css";

function FormHome() {
  return (
    <div className="home">
      <img
        className="fondo"
        src="https://alfayomega.es/wp-content/uploads/2024/07/Umuganda-Ruanda-Ruandeses.jpg"
        alt="Fondo"
      />
      <div className="contenido">
        <h1>Únete al cambio. Sé parte de una 
          <br />
          comunidad que transforma realidades</h1>
        <button>Conocer más</button>
      </div>
    </div>
  );
}

export default FormHome;
