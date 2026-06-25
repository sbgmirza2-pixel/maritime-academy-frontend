import api from "./api";

export const dashboardService = {
  getMyCourses: async () => {
    const response = await api.get(
      "/enrollments/my"
    );

    return response.data;
  },

  getCertificates: async () => {
    const response = await api.get(
      "/certifications/my"
    );

    return response.data;
  },

  getBookings: async () => {
    const response = await api.get(
      "/bookings/my"
    );

    return response.data;
  },

  getProfile: async () => {
    const response = await api.get(
      "/users/me"
    );

    return response.data;
  },
};