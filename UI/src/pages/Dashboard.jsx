import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerTransactionView from "../components/CustomerTransactionView"; // adjust path if needed
import api from "../services/api";

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) navigate("/");
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await api.getAllCustomers();
      setCustomers(res.data);
    } catch (err) {
      console.error("Failed to fetch customers", err);
    }
  };

  const handleCustomerSelect = async (customer) => {
    setSelectedCustomer(customer);
    try {
      const res = await api.getTransactionsByCustomer(customer.id);
      const formattedTransactions = res.data.map((t) => ({
        id: t.id,
        flour_type: t.flourType,
        in_time: t.inTime,
        out_time: t.outTime,
        quantity: t.quantity,
        unit_price: t.unitPrice,
        total: t.total,
      }));
      setTransactions(formattedTransactions);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    }
  };

  const handleAddCustomer = async (newCustomer) => {
    try {
      const res = await api.addCustomer(newCustomer);
      setCustomers((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Failed to add customer", err);
      alert("Failed to add customer");
    }
  };

  const handleDeleteCustomer = async (id) => {
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
    }
  };

  const handleUpdateCustomer = async (id, updatedData) => {
    try {
      await api.updateCustomer(id, updatedData);
      const updatedList = customers.map((c) =>
        c.id === id ? { ...c, ...updatedData } : c
      );
      setCustomers(updatedList);
      if (selectedCustomer?.id === id) {
        setSelectedCustomer({ ...selectedCustomer, ...updatedData });
      }
    } catch (err) {
      console.error("Failed to update customer", err);
    }
  };

  const refreshData = async () => {
    if (selectedCustomer) {
      const res = await api.getTransactionsByCustomer(selectedCustomer.id);
      setTransactions(res.data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <CustomerTransactionView
        customers={customers}
        onSelect={handleCustomerSelect}
        selectedCustomer={selectedCustomer}
        onAdd={handleAddCustomer}
        onDelete={handleDeleteCustomer}
        onUpdate={handleUpdateCustomer}
        transactions={transactions}
        refreshData={refreshData}
      />
    </div>
  );
};

export default Dashboard;
