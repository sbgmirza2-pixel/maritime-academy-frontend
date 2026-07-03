import api from "./api";

export const authService = {
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);

    // Saving tokens safely inside localStorage on successful authentication
    if (response.data.access_token) {
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("access_token", response.data.access_token);
    }
    if (response.data.refresh_token) {
      localStorage.setItem("refresh_token", response.data.refresh_token);
    }

    return response.data;
  },

  refreshToken: async (refreshToken) => {
    const response = await api.post("/auth/refresh", {
      refresh_token: refreshToken,
    });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get("/users/me");
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put("/users/me", profileData);
    return response.data;
  },

  // 6. Logout Clear Local Session
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
};