const token = localStorage.getItem("token");

export const getPerfil = async () => {
  try {
    const peticion = await fetch("http://localhost:8000/api/perfil/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const datos = await peticion.json();
    console.log("Datos del perfil:", datos);
    return datos;
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    return null;
  }
};

export const actualizarPerfil = async (nuevoNombre) => {
  try {
    const peticion = await fetch("http://localhost:8000/api/perfil/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ nombre: nuevoNombre })
    });

    const resultado = await peticion.json();
    console.log("Perfil actualizado:", resultado);
    return resultado;
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    return null;
  }
};
