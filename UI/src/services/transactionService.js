import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

export const login = (username, password) =>
  API.get(`/admin/login/${username}/${password}`);
export const getAllCustomers = () => API.get("/customers");
export const getCustomerById = (id) => API.get(`/customers/${id}`);
export const addCustomer = (data) => API.post("/customers", data);
export const updateCustomer = (id, data) => API.put(`/customers/${id}`, data);

export const getTransactionsByCustomer = (id) =>
  API.get(`/transactions/customer/${id}`);
export const addTransaction = (data) => API.post("/transactions", data);
export const updateTransaction = (id, data) =>
  API.put(`/transactions/${id}`, data);
export const getTransactionById = (id) => API.get(`/transactions/${id}`);
