import axios from "axios";

// 1. Axios Base Instance Setup
const api = axios.create({
  // Vite projects mein environment variable access karne ke liye import.meta.env use hota hai
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://maritime-shipping-traning-academy.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Global Request Interceptor (Auto-Inject JWT Bearer Token)
api.interceptors.request.use(
  (config) => {
    // Local storage se active access token read karna
    const token = localStorage.getItem("token");
    
    if (token) {
      // Backend validation formatting ke mutabiq header apply karna: Authorization: Bearer <token>
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Agar request request queue mein hi fail ho jaye
    return Promise.reject(error);
  }
);

// 3. Global Response Interceptor (Error Handling Control)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Agar token expire ho jaye ya unauthorized response (401) aaye
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized access or token expired. Redirecting or clearing storage...");
      // Optional: Aap token clear karwa sakti hain agar user session invalid ho chuka ho
      // localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default api;