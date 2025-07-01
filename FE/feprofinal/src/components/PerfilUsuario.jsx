import React, { useEffect, useState } from "react";
import { getPerfil, actualizarPerfil } from "../servicios/fetch_perfil";
import   "../styles/perfil.css";
function PerfilUsuario() {
  // estado para guardar los datos del usuario
  const [usuario, setUsuario] = useState(null);
  // estado para saber si está en modo edición
  const [editando, setEditando] = useState(false);
  // estado para guardar el nuevo nombre mientras se edita
  const [nuevoNombre, setNuevoNombre] = useState("");
  // estado para mostrar mensajes al usuario
  const [mensaje, setMensaje] = useState("");
  // estado para previsualizar una nueva imagen
  const [preview, setPreview] = useState(null);

  const [partipaciones,setParticipaciones] = useState([])

  

  // cuando el componente se monta, traigo los datos del perfil
  useEffect(() => {
    getPerfil()
      .then((data) => {
        setUsuario(data); // guardo los datos del usuario
        setNuevoNombre(data.nombre); // pongo el nombre actual para editar
      })
      .catch((error) => console.error(error)); // muestro error si falla
    async function traerParticipaciones() {
        console.log("entra");
        const peticion = await fetch("http://127.0.0.1:8000/api/crear_participaciones/")
        const respuesta = await peticion.json()
        console.log(respuesta)
        const filtradoPeticiones = respuesta.filter((partipacion)=>partipacion.usuario == localStorage.getItem("idUsuario"))
        setParticipaciones(filtradoPeticiones)
    }
    traerParticipaciones()
  }, []);

  // función para guardar los cambios en el nombre
  const guardarCambios = () => {
    actualizarPerfil(nuevoNombre)
      .then((actualizado) => {
        setUsuario(actualizado); // actualizo el estado con la nueva info 
        setEditando(false); // salgo del modo edición
        setMensaje("Nombre actualizado correctamente."); // muestro mensaje
        setTimeout(() => setMensaje(""), 3000); // borro mensaje después de unos segundos
      })
      .catch((error) => console.error(error)); // muestro error si falla
  };

  // función para cerrar sesión borrando el token 
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirijo al login
  };

  // función para previsualizar la imagen cargada
  const handleImagen = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // almaceno vista previa
      };
      reader.readAsDataURL(archivo);
    }
  };

  // si todavía no tengo datos, muestro mensaje de carga
  if (!usuario) return <p className="perfil-cargando">Cargando perfil...</p>;

  return (
    <div className="perfil-container">
      
      <div className="perfil-avatar">
        <img
          src={usuario.imagen || preview || "/img/perfil-default.png"}
          alt=""
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImagen}
          className="input-imagen"
        />
      </div>

      <h2 className="perfil-titulo">Foto de perfil</h2>

      <div className="perfil-info">
        <p><strong>Correo:</strong> {usuario.correo}</p>
        <p>
          <strong>Nombre:</strong>{" "}
          {editando ? (
            // si está editando, muestro input para cambiar nombre
            <input
              className="perfil-input"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
            />
          ) : (
            // si no, muestro el nombre normal
            usuario.nombre
          )}
        </p>

        {editando ? (
          // botón para guardar cambios si está editando
          <button className="perfil-btn" onClick={guardarCambios}>
            Guardar
          </button>
        ) : (
          // botón para entrar a modo edición
          <button className="perfil-btn" onClick={() => setEditando(true)}>
            Editar nombre
          </button>
        )}
      </div>

      <div className="perfil-campanas">
        <h3>Campañas en las que participás:</h3>
        <ul>
        
          
            {partipaciones.map((parti)=>{
              return(
                <>
                  <li>{parti.nombre_campana}</li>
                </>    
              )
            })}
          

        </ul>
      </div>

      <div className="perfil-opciones">
      
        <button
          className="perfil-btn"
          onClick={() => alert("Función cambiar contraseña aún no implementada.")}
        >
          Cambiar contraseña
        </button>
    
        <button className="perfil-btn cerrar" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>

      
      {mensaje && <p className="perfil-mensaje">{mensaje}</p>}
    </div>
  );
}

export default PerfilUsuario;
