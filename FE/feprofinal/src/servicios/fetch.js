const API_BASE_URL = "http://localhost:8000/";
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
}


// este no ocupa token
export const postUser = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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


export async function getData(endpoint, id = "") {
  try {
    const token = localStorage.getItem("token");

    const url = `http://localhost:8000/${endpoint}${id ? `${id}/` : ""}`;

    const resp = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!resp.ok) throw new Error(`Error en getData: ${resp.statusText}`);

    return await resp.json();
  } catch (err) {
    console.error("Error en getData:", err);
    throw err;
  }
};


export const putData = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });

    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("Detalle backend:", body);   
      throw new Error(`Error en putData: ${response.statusText}`);
    }

    return body;
  } catch (error) {
    console.error("Error en putData:", error);
    throw error;
  }
};

export const deleteData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",

        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
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
