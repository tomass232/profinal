const postData = async(endpoint,obj) =>{
    try {
        const peticion = await fetch(`http://localhost:8000/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
        const respuesta = await peticion.json();
        console.log(respuesta);
        return respuesta;
    } catch (error) {
        console.log(error);
    }
}
const getData = async(endpoint) =>{
    try {
        const peticion = await fetch(`http://localhost:8000/${endpoint}`);
        const respuesta = await peticion.json();
        return respuesta;
    } catch (error) {
        console.log(error);
    }
    return respuesta;

}
const obtenerCampañas = async () => {
    try {
        const campañas = await getData('campañas');
        return campañas;
    } catch (error) {
        console.log(error);
    }
}

const token = localStorage.getItem("token"); 

const peticion = await fetch("http://localhost:8000/api/perfil/", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  }
});

const data = await peticion.json();
console.log(data);

export { postData, getData, obtenerCampañas };