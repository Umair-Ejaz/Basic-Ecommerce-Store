import axios from "axios";
const BASE = "https://fakestoreapi.com";

export const fetchProducts = () => axios.get(`${BASE}/products`).then(r => r.data);
export const fetchProduct = (id) => axios.get(`${BASE}/products/${id}`).then(r => r.data);
export const fetchCategories = () => axios.get(`${BASE}/products/categories`).then(r => r.data);
export const fetchProductsByCategory = (cat) => axios.get(`${BASE}/products/category/${encodeURIComponent(cat)}`).then(r => r.data);
