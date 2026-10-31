// src/services/api.js
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5059";

async function fetchData(endpoint, options = {}) {
  const token = localStorage.getItem("token"); 
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error("No autorizado. Token inválido o expirado.");
    throw new Error(`Error HTTP: ${response.status}`);
  }
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

export const api = {
  getUsers: async (page = 1, size = 5) => fetchData(`/api/user?page=${page}&size=${size}`),
  
  login: async (username, password) => fetchData(`/api/user/login`, {
    method: "POST",
    body: JSON.stringify({ username, password })
  }),
  deleteUser: async (userId) => fetchData(`/api/user/${userId}`, { method: "DELETE" }),
};