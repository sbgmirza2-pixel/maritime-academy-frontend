import api from "./api";

export const courseService = {
  // --- 📚 COURSES MANAGEMENT ---
  getCourses: async (params = {}) => {
    // params can include: category, location, skip, limit
    const response = await api.get("/courses", { params });
    return response.data;
  },

  getCourseDetails: async (courseId) => {
    const response = await api.get(`/courses/${courseId}`);
    return response.data;
  },

  getCurriculum: async (courseId) => {
    const response = await api.get(`/courses/${courseId}/curriculum`);
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get("/courses/categories");
    return response.data;
  },

  getLocations: async () => {
    const response = await api.get("/courses/locations");
    return response.data;
  },

  // --- 📝 ENROLLMENTS & PROGRESS ---
  enrollInCourse: async (courseId) => {
    const response = await api.post("/enrollments", { course_id: courseId });
    return response.data;
  },

  getMyEnrollments: async () => {
    const response = await api.get("/enrollments/my");
    return response.data;
  },

  getEnrollmentDetails: async (enrollmentId) => {
    const response = await api.get(`/enrollments/${enrollmentId}`);
    return response.data;
  },

  updateProgress: async (enrollmentId, progress) => {
    const response = await api.put(`/enrollments/${enrollmentId}/progress`, { progress });
    return response.data;
  },

  completeEnrollment: async (enrollmentId) => {
    const response = await api.put(`/enrollments/${enrollmentId}/complete`);
    return response.data;
  },

  dropEnrollment: async (enrollmentId) => {
    const response = await api.delete(`/enrollments/${enrollmentId}/drop`);
    return response.data;
  },

  // --- 🎓 CERTIFICATIONS ---
  getMyCertifications: async () => {
    const response = await api.get("/certifications/my");
    return response.data;
  },

  getCertificationDetails: async (certId) => {
    const response = await api.get(`/certifications/${certId}`);
    return response.data;
  },

  generateCertificate: async (payload) => {
    const response = await api.post("/certifications/generate", payload);
    return response.data;
  },

  downloadCertificate: async (certId) => {
    const response = await api.get(`/certifications/${certId}/download`, {
      responseType: "blob",
    });
    return response.data;
  },
};
