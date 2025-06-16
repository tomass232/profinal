const API_BASE_URL = "http://localhost:8000"; // Cambia esta URL según la ubicación de tu backend

/**
 * Función para hacer peticiones POST.
 * @param {string} endpoint 
 * @param {object} data 
 * @returns {Promise<object>} 
 */
export const postData = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Error en postData: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en postData:", error);
    throw error;
  }
};

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
/**
 * Función para hacer peticiones GET.
 * @param {string} endpoint - El endpoint de la API.
 * @returns {Promise<object>} - La respuesta en formato JSON.
 */
export const getData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error en getData: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getData:", error);
    throw error;
  }
};

/**
 * Función para hacer peticiones PUT (para actualizar recursos).
 * @param {string} endpoint 
 * @param {object} data 
 * @returns {Promise<object>} 
 */
export const putData = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Error en putData: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en putData:", error);
    throw error;
  }
};

/**
 * Función para hacer peticiones DELETE.
 * @param {string} endpoint 
 * @returns {Promise<object>} 
 */
export const deleteData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error(`Error en deleteData: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en deleteData:", error);
    throw error;
  }
};
