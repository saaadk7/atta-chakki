// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import CustomerTransactionView from "../components/CustomerTransactionView"; // adjust path if needed
// import api from "../services/api";

// const Dashboard = () => {
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [transactions, setTransactions] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const admin = localStorage.getItem("admin");
//     if (!admin) navigate("/");
//     loadCustomers();
//   }, []);

//   const loadCustomers = async () => {
//     try {
//       const res = await api.getAllCustomers();
//       setCustomers(res.data);
//     } catch (err) {
//       console.error("Failed to fetch customers", err);
//     }
//   };

//   const handleCustomerSelect = async (customer) => {
//     setSelectedCustomer(customer);
//     try {
//       const res = await api.getTransactionsByCustomer(customer.id);
//       const formattedTransactions = res.data.map((t) => ({
//         id: t.id,
//         flour_type: t.flourType,
//         in_time: t.inTime,
//         out_time: t.outTime,
//         quantity: t.quantity,
//         unit_price: t.unitPrice,
//         total: t.total,
//       }));
//       setTransactions(formattedTransactions);
//     } catch (err) {
//       console.error("Failed to fetch transactions", err);
//     }
//   };

//   const handleAddCustomer = async (newCustomer) => {
//     try {
//       const res = await api.addCustomer(newCustomer);
//       setCustomers((prev) => [...prev, res.data]);
//     } catch (err) {
//       console.error("Failed to add customer", err);
//       alert("Failed to add customer");
//     }
//   };

//   const handleDeleteCustomer = async (id) => {
//     try {
//       await api.deleteCustomer(id);
//       const updatedList = customers.filter((c) => c.id !== id);
//       setCustomers(updatedList);
//       if (selectedCustomer?.id === id) {
//         setSelectedCustomer(null);
//         setTransactions([]);
//       }
//     } catch (err) {
//       console.error("Failed to delete customer", err);
//     }
//   };

//   const handleUpdateCustomer = async (id, updatedData) => {
//     try {
//       await api.updateCustomer(id, updatedData);
//       const updatedList = customers.map((c) =>
//         c.id === id ? { ...c, ...updatedData } : c
//       );
//       setCustomers(updatedList);
//       if (selectedCustomer?.id === id) {
//         setSelectedCustomer({ ...selectedCustomer, ...updatedData });
//       }
//     } catch (err) {
//       console.error("Failed to update customer", err);
//     }
//   };

//   const refreshData = async () => {
//     if (selectedCustomer) {
//       const res = await api.getTransactionsByCustomer(selectedCustomer.id);
//       setTransactions(res.data);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <CustomerTransactionView
//         customers={customers}
//         onSelect={handleCustomerSelect}
//         selectedCustomer={selectedCustomer}
//         onAdd={handleAddCustomer}
//         onDelete={handleDeleteCustomer}
//         onUpdate={handleUpdateCustomer}
//         transactions={transactions}
//         refreshData={refreshData}
//       />
//     </div>

//   );
// };


// export default Dashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerTransactionView from "../components/CustomerTransactionView";
import api from "../services/api";
import TransactionReport from "../components/TransactionReport";

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const admin = localStorage.getItem("admin");
      if (!admin) {
        navigate("/", { replace: true });
        return false;
      }
      return true;
    };

    if (checkAuth()) {
      loadCustomers();
    }
  }, [navigate]);

  const loadCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getAllCustomers();
      setCustomers(res.data);
    } catch (err) {
      console.error("Failed to fetch customers", err);
      setError("Failed to load customers. Please try again.");
      // If unauthorized, redirect to login
      if (err.response?.status === 401) {
        localStorage.removeItem("admin");
        navigate("/", { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerSelect = async (customer) => {
    if (!customer) {
      setSelectedCustomer(null);
      setTransactions([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await api.getTransactionsByCustomer(customer.id);
      setSelectedCustomer(customer);
      setTransactions(
        res.data.map((t) => ({
          id: t.id,
          flour_type: t.flourType,
          in_time: t.inTime,
          out_time: t.outTime,
          quantity: t.quantity,
          unit_price: t.unitPrice,
          total: t.total,
        }))
      );
    } catch (err) {
      console.error("Failed to fetch transactions", err);
      setError("Failed to load transactions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = async (newCustomer) => {
    setLoading(true);
    try {
      const res = await api.addCustomer(newCustomer);
      setCustomers((prev) => [...prev, res.data]);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("Failed to add customer", err);
      setError("Failed to add customer");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCustomer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;

    setLoading(true);
    try {
      await api.deleteCustomer(id);
      const updatedList = customers.filter((c) => c.id !== id);
      setCustomers(updatedList);
      if (selectedCustomer?.id === id) {
        setSelectedCustomer(null);
        setTransactions([]);
      }
    } catch (err) {
      console.error("Failed to delete customer", err);
      setError("Failed to delete customer");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCustomer = async (id, updatedData) => {
    setLoading(true);
    try {
      await api.updateCustomer(id, updatedData);
      const updatedList = customers.map((c) =>
        c.id === id ? { ...c, ...updatedData } : c
      );
      setCustomers(updatedList);
      if (selectedCustomer?.id === id) {
        setSelectedCustomer((prev) => ({ ...prev, ...updatedData }));
      }
      return true;
    } catch (err) {
      console.error("Failed to update customer", err);
      setError("Failed to update customer");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/", { replace: true });
  };

  const refreshData = async () => {
    if (selectedCustomer) {
      await handleCustomerSelect(selectedCustomer);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {loading && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
          Loading...
        </div>
      )}

      <CustomerTransactionView
        customers={customers}
        onSelect={handleCustomerSelect}
        selectedCustomer={selectedCustomer}
        onAdd={handleAddCustomer}
        onDelete={handleDeleteCustomer}
        onUpdate={handleUpdateCustomer}
        transactions={transactions}
        refreshData={refreshData}
        isLoading={loading}
      />
     <TransactionReport 
     
     />

    </div>
  );
};

export default Dashboard;