import React, { useEffect, useState } from "react";
import { getData, putData } from "../servicios/fetch";

function PerfilUsuario() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    getData("/perfil") 
      .then((data) => {
        setUsuario(data);
        setNuevoNombre(data.nombre);
      })
      .catch((error) => console.error(error));
  }, []);

  const guardarCambios = () => {
    putData("/perfil", { nombre: nuevoNombre })
      .then((actualizado) => {
        setUsuario(actualizado);
        setEditando(false);
        setMensaje("Nombre actualizado correctamente.");
      })
      .catch((error) => console.error(error));
  };

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (!usuario) return <p className="perfil-cargando">Cargando perfil...</p>;

  return (
    <div className="perfil-container">
      <h2 className="perfil-titulo">Mi Perfil</h2>

      <div className="perfil-info">
        <p><strong>Correo:</strong> {usuario.correo}</p>
        <p>
          <strong>Nombre:</strong>{" "}
          {editando ? (
            <input
              className="perfil-input"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
            />
          ) : (
            usuario.nombre
          )}
        </p>

        {editando ? (
          <button className="perfil-btn" onClick={guardarCambios}>
            Guardar
          </button>
        ) : (
          <button className="perfil-btn" onClick={() => setEditando(true)}>
            Editar nombre
          </button>
        )}
      </div>

      <div className="perfil-campanas">
        <h3>Campañas en las que participás:</h3>
        <ul>
          {usuario.campañas?.map((c, index) => (
            <li key={index}>{c.nombre}</li>
          ))}
        </ul>
      </div>

      <div className="perfil-opciones">
        <button className="perfil-btn" onClick={() => alert("Función cambiar contraseña aún no implementada.")}>
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
