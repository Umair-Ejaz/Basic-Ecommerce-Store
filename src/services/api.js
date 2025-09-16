const token = localStorage.getItem("token");

export const register = (data) =>
  axios.post(`${BASE}/auth/register`, data).then(r => r.data);

export const login = (data) =>
  axios.post(`${BASE}/auth/login`, data).then(r => {
    localStorage.setItem("token", r.data.token);
    return r.data;
  });

export const placeOrder = (order) =>
  axios.post(`${BASE}/orders`, order, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  }).then(r => r.data);

export const fetchMyOrders = () =>
  axios.get(`${BASE}/orders/my`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  }).then(r => r.data);
