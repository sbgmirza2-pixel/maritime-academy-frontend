import api from './api';

export const bookingService = {
  // --- TRIPS ---
  getTrips: async (params) => {
    // params: location, featured_only, available_only, skip, limit
    const response = await api.get('/trips', { params });
    return response.data;
  },

  getFeaturedTrips: async () => {
    const response = await api.get('/trips/featured');
    return response.data;
  },

  getTripLocations: async () => {
    const response = await api.get('/trips/locations');
    return response.data;
  },

  getTripDetails: async (id) => {
    const response = await api.get(`/trips/${id}`);
    return response.data;
  },

  // --- BOOKINGS ---
  getMyBookings: async () => {
    const response = await api.get('/bookings/my'); // Deployed endpoint path
    return response.data;
  },

  getBookingDetails: async (id) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  cancelBooking: async (id) => {
    const response = await api.delete(`/bookings/${id}/cancel`);
    return response.data;
  },

  // --- STRIPE PAYMENTS ---
  createPaymentIntent: async (bookingId) => {
    const response = await api.post('/payments/create-intent', { booking_id: bookingId });
    return response.data;
  },

  verifyPayment: async (paymentIntentId) => {
    const response = await api.get(`/payments/verify/${paymentIntentId}`);
    return response.data;
  },

  getPaymentStatus: async (id) => {
    const response = await api.get(`/payments/${id}/status`);
    return response.data;
  },

  getPaymentHistory: async () => {
    const response = await api.get('/payments/history');
    return response.data;
  },

  // --- SHIPPING SERVICES ---
  getShippingServices: async () => {
    const response = await api.get('/shipping');
    return response.data;
  },

  bookShippingService: async (id) => {
    const response = await api.post(`/shipping/${id}/book`);
    return response.data;
  }
};