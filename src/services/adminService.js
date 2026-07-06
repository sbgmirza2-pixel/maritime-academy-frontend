import api from "./api";

const normalizeUsersResponse = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.users)) return data.users;
  if (Array.isArray(data.data)) return data.data;
  if (data.user) return [data.user];
  return [data];
};

export const adminService = {
  getAdminStats: async () => {
    try {
      const response = await api.get("/admin/dashboard/stats");
      return response.data || null;
    } catch (error) {
      if ([401, 403, 404].includes(error.response?.status)) {
        return null;
      }
      throw error;
    }
  },

  getUsers: async () => {
    try {
      const response = await api.get("/users");
      return {
        users: normalizeUsersResponse(response.data),
        listSupported: true,
      };
    } catch (error) {
      if ([401, 403, 404].includes(error.response?.status)) {
        try {
          const profileResponse = await api.get("/users/me");
          return {
            users: normalizeUsersResponse(profileResponse.data),
            listSupported: false,
          };
        } catch (profileError) {
          if ([401, 403, 404].includes(profileError.response?.status)) {
            return {
              users: [],
              listSupported: false,
            };
          }
          throw profileError;
        }
      }
      throw error;
    }
  },

  createUser: (userData) => api.post("/users", userData),
  deleteUser: (userId) => api.delete(`/users/${userId}`),

  getCourses: async () => {
    const response = await api.get("/courses");
    return response.data?.courses || response.data || [];
  },

  updateCourse: (courseId, courseData) => api.put(`/courses/${courseId}`, courseData),
  deleteCourse: (courseId) => api.delete(`/courses/${courseId}`),

  getBookings: async () => {
    try {
      const response = await api.get("/bookings");
      return response.data || [];
    } catch (error) {
      if ([401, 403, 404].includes(error.response?.status)) {
        try {
          const response = await api.get("/bookings/my");
          return response.data || [];
        } catch {
          return [];
        }
      }
      throw error;
    }
  },
  updateBooking: (bookingId, bookingData) => api.put(`/bookings/${bookingId}/status`, bookingData),
  cancelBooking: (bookingId) => api.delete(`/bookings/${bookingId}/cancel`),

  getPayments: () => api.get("/payments/history"),
};
