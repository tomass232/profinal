const API_BASE_URL = "http://localhost:8000/";

// función para enviar datos al backend por POST
export const postData = async (endpoint, data) => {
  try {
    const token = localStorage.getItem("token"); // 🔐 obtenemos el token JWT
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }) // 🔐 incluimos token si existe
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Error en postData: ${response.statusText}`);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error en postData:", error);
    throw error;
  }
};

// función para traer datos del backend (GET)
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

// función para actualizar datos con PUT
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

// función para eliminar datos del backend
export const deleteData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
      throw new Error(`Error en deleteData: ${response.statusText}`);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error en deleteData:", error);
    throw error;
  }
};
