import api from './api';

export const courseService = {
  // --- COURSES ---
  getCourses: async (params) => {
    // params can include: category, location, skip, limit
    const response = await api.get('/courses', { params });
    return response.data;
  },

  getCourseDetails: async (id) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  // --- CURRICULUM ---
  getCurriculum: async (courseId) => {
    const response = await api.get(`/courses/${courseId}/curriculum`);
    return response.data;
  },

  // --- ENROLLMENTS ---
  enrollInCourse: async (courseId) => {
    const response = await api.post('/enrollments', { course_id: courseId });
    return response.data;
  },

  getMyEnrollments: async () => {
    const response = await api.get('/enrollments/my');
    return response.data;
  },

  updateProgress: async (enrollmentId, progressValue) => {
    const response = await api.put(`/enrollments/${enrollmentId}/progress?progress=${progressValue}`);
    return response.data;
  },

  // --- CERTIFICATIONS ---
  getMyCertifications: async () => {
    const response = await api.get('/certifications/my');
    return response.data;
  },

  getCertificationDetails: async (id) => {
    const response = await api.get(`/certifications/${id}`);
    return response.data;
  }
};