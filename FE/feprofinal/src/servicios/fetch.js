const API_BASE_URL = "http://localhost:8000/"; // Cambia esta URL según la ubicación de tu backend

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
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error en postData:", error);
    throw error;
  }
}



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
