import api from "./api";

export const courseService = {
  getCourses: async (params = {}) => {
    const response = await api.get(
      "/courses",
      { params }
    );

    return response.data;
  },

  getCourseDetails: async (courseId) => {
    const response = await api.get(
      `/courses/${courseId}`
    );

    return response.data;
  },

  getCurriculum: async (courseId) => {
    const response = await api.get(
      `/courses/${courseId}/curriculum`
    );

    return response.data;
  },

  enrollInCourse: async (courseId) => {
    const response = await api.post(
      "/enrollments",
      {
        course_id: courseId,
      }
    );

    return response.data;
  },

  getMyEnrollments: async () => {
    const response = await api.get(
      "/enrollments/my"
    );

    return response.data;
  },

  updateProgress: async (
    enrollmentId,
    progress
  ) => {
    const response = await api.put(
      `/enrollments/${enrollmentId}/progress?progress=${progress}`
    );

    return response.data;
  },

  getMyCertifications: async () => {
    const response = await api.get(
      "/certifications/my"
    );

    return response.data;
  },

  getCertificationDetails: async (
    certId
  ) => {
    const response = await api.get(
      `/certifications/${certId}`
    );

    return response.data;
  },

  getCategories: async () => {
    const response = await api.get(
      "/courses/categories"
    );

    return response.data;
  },

  getLocations: async () => {
    const response = await api.get(
      "/courses/locations"
    );

    return response.data;
  },
};