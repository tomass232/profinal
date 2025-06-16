import React from 'react';
import { Link } from "react-router-dom";

function Privada({ children }) {
  function usuarioValido() {
    const usuario = localStorage.getItem("idUsuario");
    if (usuario) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      {usuarioValido() ? (
        children
      ) : (
        <div>
          Usted no inició sesión, por favor inicie sesión <Link to={"/login"}>Login</Link>
        </div>
      )}
    </>
  );
}

export default Privada;
