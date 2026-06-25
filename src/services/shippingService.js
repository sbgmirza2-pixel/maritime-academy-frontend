import api from "./api";

export const shippingService = {
  getShippingServices: async () => {
    const response = await api.get(
      "/shipping"
    );

    return response.data;
  },

  getShippingServiceById: async (
    serviceId
  ) => {
    const response = await api.get(
      `/shipping/${serviceId}`
    );

    return response.data;
  },

  createShippingBooking: async (
    serviceId
  ) => {
    const response = await api.post(
      `/shipping/${serviceId}/book`
    );

    return response.data;
  },
};