import React from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";


function FormHome() {
  return (
    <div className="home">
      <img
        className="fondo"
        src="https://alfayomega.es/wp-content/uploads/2024/07/Umuganda-Ruanda-Ruandeses.jpg"
        alt="Fondo"/>
      <div className="contenido">
        <div className="info">
          <h2>¿Qué es nuestra plataforma?</h2>
          <h3>Nuestra plataforma conecta a personas voluntarias con organizaciones sociales, permitiendo que más personas se sumen a
            causas que generan un impacto positivo en sus comunidades.
            Nos dedicamos a facilitar el acceso al voluntariado a través de una herramienta simple, organizada y accesible para todos.
            Las organizaciones pueden publicar campañas o actividades donde necesitan ayuda, y las personas usuarias pueden inscribirse,
            participar y hacer seguimiento de su colaboración.</h3>
          <h2>¿Cuál es nuestro objetivo?</h2>
          <h3>Nuestro fin es crear una red solidaria entre la sociedad civil y las organizaciones sociales, promoviendo la participación ciudadana,
            el compromiso social y el trabajo conjunto para construir una comunidad más justa, empática y activa.</h3>
        </div>
        <div className="derecha">
          <h1>Únete al cambio. Sé parte de una
            <br />
            comunidad que transforma realidades</h1>
          <Link to="/campaña">
            <button>Conocer más</button>
          </Link>
        </div>
      </div>
    </div>


  );
}



export default FormHome;
