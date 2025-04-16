/* services/authService.js */
import axios from "./api";

const login = async (username, password) => {
  const response = await axios.post("/login", {
    username,
    password,
  });

  if (!response.data) throw new Error("Login failed");
  localStorage.setItem("admin", JSON.stringify(response.data));
  return response.data;
};

export default { login };
