import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
// import TransactionPage from "./pages/TransactionPage";
// import TransactionPage from "./pages/TransactionPage";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route
          path="/transactions/:customerId"
          element={<TransactionPageWrapper />}
        /> */}
      </Routes>
    </Router>
  );
};

export default App;
