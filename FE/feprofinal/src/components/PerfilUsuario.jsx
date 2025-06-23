import React, { useEffect, useState } from "react";
import { getData, putData } from "../servicios/fetch";

function PerfilUsuario() {
  // estado para guardar los datos del usuario
  const [usuario, setUsuario] = useState(null);
  // estado para saber si está en modo edición
  const [editando, setEditando] = useState(false);
  // estado para guardar el nuevo nombre mientras se edita
  const [nuevoNombre, setNuevoNombre] = useState("");
  // estado para mostrar mensajes al usuario
  const [mensaje, setMensaje] = useState("");

  // cuando el componente se monta, traigo los datos del perfil
  useEffect(() => {
    getData("/perfil") 
      .then((data) => {
        setUsuario(data); // guardo los datos del usuario
        setNuevoNombre(data.nombre); // pongo el nombre actual para editar
      })
      .catch((error) => console.error(error)); // muestro error si falla
  }, []);

  // función para guardar los cambios en el nombre
  const guardarCambios = () => {
    putData("/perfil", { nombre: nuevoNombre }) // mando la actualización
      .then((actualizado) => {
        setUsuario(actualizado); // actualizo el estado con la nueva info
        setEditando(false); // salgo del modo edición
        setMensaje("Nombre actualizado correctamente."); // muestro mensaje
      })
      .catch((error) => console.error(error)); // muestro error si falla
  };

  // función para cerrar sesión borrando el token
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirijo al login
  };

  // si todavía no tengo datos, muestro mensaje de carga
  if (!usuario) return <p className="perfil-cargando">Cargando perfil...</p>;

  return (
    <div className="perfil-container">
      <h2 className="perfil-titulo">Mi Perfil</h2>

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
          {/* muestro la lista de campañas del usuario */}
          {usuario.campañas?.map((c, index) => (
            <li key={index}>{c.nombre}</li>
          ))}
        </ul>
      </div>

      <div className="perfil-opciones">
        {/* botón para cambiar contraseña, todavía no implementado */}
        <button className="perfil-btn" onClick={() => alert("Función cambiar contraseña aún no implementada.")}>
          Cambiar contraseña
        </button>
        {/* botón para cerrar sesión */}
        <button className="perfil-btn cerrar" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>

      {/* muestro mensaje si hay alguno */}
      {mensaje && <p className="perfil-mensaje">{mensaje}</p>}
    </div>
  );
}

export default PerfilUsuario;
