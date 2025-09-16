import axios from "axios";

const API_URL = "http://localhost:5000/api/order-items";

export const getOrderItems = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getOrderItemById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createOrderItem = async (item) => {
  const res = await axios.post(API_URL, item);
  return res.data;
};

export const updateOrderItem = async (id, item) => {
  const res = await axios.put(`${API_URL}/${id}`, item);
  return res.data;
};

export const deleteOrderItem = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
