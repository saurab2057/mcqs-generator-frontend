// src/api.jsx
import axios from "axios";

// Create Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:5000", // base URL of backend
  withCredentials: true, // send cookies/auth with requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
