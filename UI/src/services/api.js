// import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:8000" });

// const api = {
//   // Auth
//   login: (username, password) => API.post("/login", { username, password }),

//   // Customers
//   getAllCustomers: () => API.get("/customers"),
//   getCustomerById: (id) => API.get(`/customers/${id}`),
//   addCustomer: (data) => API.post("/customers", data),
//   deleteCustomer: (id) => axios.delete(`/customers/${id}`),

//   updateCustomer: (id, data) => API.put(`/customers/${id}`, data),

//   // Transactions
//   getTransactionsByCustomer: (id) => API.get(`/transactions/${id}`),
//   getTransactionById: (id) => API.get(`/transactions/${id}`),
//   addTransaction: (data) => API.post("/transactions", data),
//   updateTransaction: (id, data) => API.put(`/transactions/${id}`, data),
//   deleteTransaction: (id) => API.delete(`/transactions/${id}`),
//   // addCustomer: (data) => axios.post("/customers", data),
//   // updateCustomer: (id, data) => axios.put(`/customers/${id}`, data),
//   // deleteCustomer: (id) => axios.delete(`/customers/${id}`),
// };

// export default api;

//main code
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

const api = {
  // Auth
  login: (username, password) => API.post("/login", { username, password }),

  // Customers
  getAllCustomers: () => API.get("/customers"),
  getCustomerById: (id) => API.get(`/customers/${id}`),
  addCustomer: (data) => API.post("/customers", data),
  updateCustomer: (id, data) => API.put(`/customers/${id}`, data),
  deleteCustomer: (id) => API.delete(`/customers/${id}`),

  // Transactions
  getTransactionsByCustomer: (id) => API.get(`/transactions/${id}`),
  getTransactionById: (id) => API.get(`/transactions/${id}`),
  addTransaction: (data) => API.post("/transactions", data),
  updateTransaction: (id, data) => API.put(`/transactions/${id}`, data),
  deleteTransaction: (id) => API.delete(`/transactions/${id}`),
};

export default api;

//heyllo

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://your-api-url.com/api",
//   login: (username, password) => api.post("/login", { username, password }),
// });


// export default {

//   // Customer endpoints
//   getAllCustomers: () => api.get("/customers"),
//   addCustomer: (data) => api.post("/customers", data),
//   updateCustomer: (id, data) => api.put(`/customers/${id}`, data),
//   deleteCustomer: (id) => api.delete(`/customers/${id}`),

//   // Transaction endpoints
//   getTransactionsByCustomer: (customerId) =>
//     api.get(`/transactions?customerId=${customerId}`),
//   addTransaction: (data) => api.post("/transactions", data),
//   updateTransaction: (id, data) => api.put(`/transactions/${id}`, data),
//   deleteTransaction: (id) => api.delete(`/transactions/${id}`),
// };