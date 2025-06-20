const token = localStorage.getItem("token");

const peticion = await fetch("http://localhost:8000/api/perfil/", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`  
  }
});

const datos = await peticion.json();
console.log(datos);
