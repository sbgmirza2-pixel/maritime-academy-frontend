import api from "./api";

export const bookingService = {
  getTrips: async (params = {}) => {
    const response = await api.get(
      "/trips",
      { params }
    );

    return response.data;
  },

  getFeaturedTrips: async () => {
    const response = await api.get(
      "/trips/featured"
    );

    return response.data;
  },

  getTripLocations: async () => {
    const response = await api.get(
      "/trips/locations"
    );

    return response.data;
  },

  getTripDetails: async (tripId) => {
    const response = await api.get(
      `/trips/${tripId}`
    );

    return response.data;
  },

  bookTrip: async (tripId, data) => {
    const response = await api.post(
      `/trips/${tripId}/book`,
      data
    );

    return response.data;
  },

  getMyBookings: async () => {
    const response = await api.get(
      "/bookings/my"
    );

    return response.data;
  },

  getBookingDetails: async (
    bookingId
  ) => {
    const response = await api.get(
      `/bookings/${bookingId}`
    );

    return response.data;
  },

  cancelBooking: async (
    bookingId
  ) => {
    const response = await api.delete(
      `/bookings/${bookingId}/cancel`
    );

    return response.data;
  },

  createPaymentIntent: async (
    paymentData
  ) => {
    const response = await api.post(
      "/payments/create-intent",
      paymentData
    );

    return response.data;
  },

  verifyPayment: async (
    paymentIntentId
  ) => {
    const response = await api.get(
      `/payments/verify/${paymentIntentId}`
    );

    return response.data;
  },

  getPaymentStatus: async (
    paymentId
  ) => {
    const response = await api.get(
      `/payments/${paymentId}/status`
    );

    return response.data;
  },

  getPaymentHistory: async () => {
    const response = await api.get(
      "/payments/history"
    );

    return response.data;
  },
};