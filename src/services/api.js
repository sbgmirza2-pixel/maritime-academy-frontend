import axios from 'axios';

// Base URL set karein (apne backend portal ke mutabiq)
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // 👈 Apne backend ka URL lagayein
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔒 Request Interceptor: Har request se pehle token add karega
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 👈 Har request ke sath JWT jayega
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🔄 Response Interceptor: Agar token expire ho jaye toh handle karega
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Agar 401 (Unauthorized) error aaye aur pehle retry na kiya ho
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        // Backend par naya token mangne ki request
        const res = await axios.post('http://localhost:8000/api/auth/refresh', {
          refresh_token: refreshToken,
        });

        if (res.status === 200) {
          localStorage.setItem('access_token', res.data.access_token);
          api.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
          return api(originalRequest); // Purani request ko naye token ke sath dobara chalao
        }
      } catch (refreshError) {
        // Agar refresh token bhi expire ho gaya toh user ko logout kardo
        localStorage.clear();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;