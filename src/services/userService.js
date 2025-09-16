import axios from "axios";

const API_URL = "http://localhost:5000/api/users"; // your backend URL

export const getUsers = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

// ✅ Add this function
export const createUser = async (userData) => {
  const res = await axios.post(API_URL, userData);
  return res.data;
};

// ✅ Optional: updateUser
export const updateUser = async (id, userData) => {
  const res = await axios.put(`${API_URL}/${id}`, userData);
  return res.data;
};
