
import React from "react";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./components/LoginForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<LoginForm />} />
          {/* <Route path="/" element={<Dashboard />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
