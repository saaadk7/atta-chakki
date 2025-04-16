/* LoginForm.jsx */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login(username, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto mt-24 p-6 bg-white rounded shadow"
    >
      <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
      <input
        className="w-full p-2 mb-3 border rounded"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="w-full p-2 mb-3 border rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Login
      </button>
    </form>
  );
}
