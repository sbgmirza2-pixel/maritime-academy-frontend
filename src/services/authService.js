import api from './api';

export const authService = {
  // 1. Register — POST /auth/register
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // 2. Login — POST /auth/login
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  },

  // 3. Refresh Token — POST /auth/refresh
  refreshToken: async (refreshToken) => {
    const response = await api.post('/auth/refresh', { refresh_token: refreshToken });
    return response.data;
  },

  // 4. Get Profile — GET /users/me
  getProfile: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  // 5. Update Profile — PUT /users/me
  updateProfile: async (profileData) => {
    const response = await api.put('/users/me', profileData);
    return response.data;
  }
};