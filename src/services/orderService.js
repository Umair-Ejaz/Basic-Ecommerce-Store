import axios from "axios";

const API_URL = "http://localhost:5000/api/orders"; // adjust if backend runs elsewhere

// CREATE new order
export const createOrder = async (orderData) => {
  const response = await axios.post(API_URL, orderData);
  return response.data;
};

// GET all orders
export const getOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// GET order by ID
export const getOrderById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// UPDATE order
export const updateOrder = async (id, orderData) => {
  const response = await axios.put(`${API_URL}/${id}`, orderData);
  return response.data;
};

// DELETE order
export const deleteOrder = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
