import api from './api';

export const aiService = {
  askChatbot: async (payload) => {
    // payload: { message, course_id, trip_id }
    const response = await api.post('/ai/chat', payload);
    return response.data;
  },

  voiceSearch: async (textQuery) => {
    const response = await api.post('/ai/voice-search', { text: textQuery });
    return response.data;
  },

  getRecommendations: async (userId) => {
    const response = await api.get(`/ai/recommendations?user_id=${userId}`);
    return response.data;
  },

  optimizeSchedule: async (payload) => {
    // payload: { course_id, preferred_start_date, preferred_location }
    const response = await api.post('/ai/schedule-optimizer', payload);
    return response.data;
  },

  predictPrice: async (courseId) => {
    const response = await api.post('/ai/predict-price', { course_id: courseId });
    return response.data;
  },

  // --- ANALYTICS, REVIEWS & ALERTS ---
  getPlatformStats: async () => {
    const response = await api.get('/platform/stats');
    return response.data;
  },

  getFeaturedReviews: async () => {
    const response = await api.get('/reviews/featured');
    return response.data;
  },

  createEmailAlert: async (alertData) => {
    // alertData: { filters_json: {...}, frequency: "weekly" }
    const response = await api.post('/alerts', alertData);
    return response.data;
  },

  getMyAlerts: async () => {
    const response = await api.get('/alerts');
    return response.data;
  }
};