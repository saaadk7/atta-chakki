// /* LoginForm.jsx */
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import authService from "../services/authService";

// export default function LoginForm() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await authService.login(username, password);
//       navigate("/dashboard");
//     } catch (err) {
//       setError("Invalid credentials");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleLogin}
//       className="max-w-md mx-auto mt-24 p-6 bg-white rounded shadow"
//     >
//       <h2 className="text-xl text-center  font-semibold mb-4">Admin Login</h2>
//       <input
//         className="w-full p-2 mb-3 border rounded"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         className="w-full p-2 mb-3 border rounded"
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       {error && <p className="text-red-500 mb-3">{error}</p>}
//       <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
//         Login
//       </button>
//     </form>
//   );
// }

//heyloo

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import authService from "../services/authService";

// export default function LoginForm() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await authService.login(username, password); // Calls backend login
//       navigate("/dashboard"); // Navigate on success
//     } catch (err) {
//       setError("Invalid credentials"); // Show error on failure
//     }
//   };

//   return (
//     <form
//       onSubmit={handleLogin}
//       className="max-w-md mx-auto mt-24 p-6 bg-white rounded shadow"
//     >
//       <h2 className="text-xl text-center font-semibold mb-4">Admin Login</h2>

//       <input
//         className="w-full p-2 mb-3 border rounded"
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         required
//       />

//       <input
//         className="w-full p-2 mb-3 border rounded"
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />

//       {error && <p className="text-red-500 mb-3">{error}</p>}

//       <button
//         type="submit"
//         className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
//       >
//         Login
//       </button>
//     </form>
//   );
// }

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import authService from "../services/authService";

// export default function LoginForm() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check authentication status
//     const isAuthenticated = localStorage.getItem("admin");

//     if (isAuthenticated) {
//       // If already logged in, redirect to dashboard and prevent going back
//       navigate("/dashboard", { replace: true });
//     }

//     // Add event listener for popstate (back/forward navigation)
//     const handlePopState = () => {
//       if (localStorage.getItem("admin")) {
//         navigate("/dashboard", { replace: true });
//       }
//     };

//     window.addEventListener("popstate", handlePopState);

//     return () => {
//       window.removeEventListener("popstate", handlePopState);
//     };
//   }, [navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!username || !password) {
//       setError("Username and password are required");
//       return;
//     }

//     try {
//       await authService.login(username, password);
//       localStorage.setItem("admin", "true");

//       // Clear any existing navigation history related to login
//       window.history.replaceState(null, "", "/dashboard");
//       navigate("/dashboard", { replace: true });
//     } catch (err) {
//       setError("Invalid credentials");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleLogin}
//       className="max-w-md mx-auto mt-24 p-6 bg-white rounded shadow"
//     >
//       <h2 className="text-xl text-center font-semibold mb-4">Admin Login</h2>
//       <input
//         className="w-full p-2 mb-3 border rounded"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         className="w-full p-2 mb-3 border rounded"
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       {error && <p className="text-red-500 mb-3">{error}</p>}
//       <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
//         Login
//       </button>
//     </form>
//   );
// }

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import authService from "../services/authService";

// export default function LoginForm() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check authentication status
//     const isAuthenticated = localStorage.getItem("admin");

//     if (isAuthenticated) {
//       // If already logged in, redirect to dashboard and prevent going back
//       navigate("/dashboard", { replace: true });
//     }

//     // Add event listener for popstate (back/forward navigation)
//     const handlePopState = () => {
//       if (localStorage.getItem("admin")) {
//         navigate("/dashboard", { replace: true });
//       }
//     };

//     window.addEventListener("popstate", handlePopState);

//     return () => {
//       window.removeEventListener("popstate", handlePopState);
//     };
//   }, [navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!username || !password) {
//       setError("Username and password are required");
//       return;
//     }

//     try {
//       await authService.login(username, password);
//       localStorage.setItem("admin", "true");

//       // Clear any existing navigation history related to login
//       window.history.replaceState(null, "", "/dashboard");
//       navigate("/dashboard", { replace: true });
//     } catch (err) {
//       setError("Invalid credentials");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleLogin}
//       className="max-w-md mx-auto mt-24 p-6 bg-white rounded shadow"
//     >
//       <h2 className="text-xl text-center font-semibold mb-4">Admin Login</h2>
//       <input
//         className="w-full p-2 mb-3 border rounded"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         className="w-full p-2 mb-3 border rounded"
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       {error && <p className="text-red-500 mb-3">{error}</p>}
//       <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
//         Login
//       </button>
//     </form>
//   );
// }


// LoginForm.jsx
// File: LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.login(formData.username, formData.password);

      // Check if response contains admin data (adjust based on your actual API response)
      if (response.data) {
        localStorage.setItem("admin", JSON.stringify(response.data));
        // navigate("/dashboard");
        navigate("/dashboard", { replace: true });
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Flour Mill Admin Login
          </h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleInputChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your username"
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;