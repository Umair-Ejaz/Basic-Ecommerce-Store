import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

// Get all products
export const getProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Get single product
export const getProductById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Create new product
export const createProduct = async (productData) => {
  const res = await axios.post(API_URL, productData);
  return res.data;
};

// Update product
export const updateProduct = async (id, productData) => {
  const res = await axios.put(`${API_URL}/${id}`, productData);
  return res.data;
};

// Delete product
export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
