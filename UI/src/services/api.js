import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

const api = {
  login: (username, password) => API.post("/login", { username, password }),
  getAllCustomers: () => API.get("/customers"),
  getCustomerById: (id) => API.get(`/customers/${id}`),
  addCustomer: (data) => API.post("/customers", data),
  updateCustomer: (id, data) => API.put(`/customers/${id}`, data),

  // getTransactionsByCustomer:  API.get(`/transactions`),
  getTransactionsByCustomer: (id) => API.get(`/transactions/${id}`),

  

  addTransaction: (data) => API.post("/transactions", data),
  updateTransaction: (id, data) => API.put(`/transactions/${id}`, data),
  getTransactionById: (id) => API.get(`/transactions/${id}`),
};

export default api;

