// src/api.jsx
import axios from "axios";

// Create Axios instance
const apiClient = axios.create({
  baseURL: "https://mcqs-generator-backend.onrender.com", // base URL of backend
  withCredentials: true, // send cookies/auth with requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
