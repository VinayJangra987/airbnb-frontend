import axios from "axios";

const api = axios.create({
  baseURL: "https://airbnb-backend-rvq9.onrender.com",  
  // baseURL: "http://localhost:5000",  // ← yeh uncomment karo
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default api;