

//main code
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

const api = {
  // Auth
  login: (username, password) => API.post("/login", { username, password }),

  //Admins
  getAllAdmins: () => API.get("/getAllAdmins"),
  toggleAdminStatus: (id) => API.put(`/toggleAdminStatus/${id}`),
  deleteAdmin: (id) => API.delete(`/admins/${id}`), // Or your actual delete endpoint

  // Customers
  getAllCustomers: () => API.get("/customers"),
  getCustomerById: (id) => API.get(`/customers/${id}`),
  addCustomer: (data) => API.post("/customers", data),
  updateCustomer: (id, data) => API.put(`/customers/${id}`, data),
  deleteCustomer: (id) => API.delete(`/customers/${id}`),

  // Transactions
  getAllTransactions: () => API.get("/transactions"),
  getTransactionsByCustomer: (id) => API.get(`/transactions/${id}`),
  getTransactionById: (id) => API.get(`/transactions/${id}`),
  addTransaction: (data) => API.post("/transactions", data),
  updateTransaction: (id, data) => API.put(`/transactions/${id}`, data),
  deleteTransaction: (id) => API.delete(`/transactions/${id}`),
};

export default api;
