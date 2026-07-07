import api from "./api";

export const shippingService = {
  getShippingServices: async () => {
    const response = await api.get("/shipping/");
    return response.data;
  },

  getShippingServiceById: async (serviceId) => {
    const response = await api.get(`/shipping/${serviceId}`);
    return response.data;
  },

  createShippingService: async (serviceData) => {
    const response = await api.post("/shipping/", serviceData);
    return response.data;
  },

  updateShippingService: async (serviceId, serviceData) => {
    const response = await api.put(`/shipping/${serviceId}`, serviceData);
    return response.data;
  },

  deleteShippingService: async (serviceId) => {
    const response = await api.delete(`/shipping/${serviceId}`);
    return response.data;
  },

  bookShippingService: async (serviceId, bookingData = {}) => {
    const response = await api.post(`/shipping/${serviceId}/book`, bookingData);
    return response.data;
  },
};
