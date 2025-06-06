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
}
export { postData, getData };