// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerList from "../components/CustomerList";
import TransactionList from "../components/TransactionList";
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

  // const handleCustomerSelect = async (customer) => {
  //   setSelectedCustomer(customer);
  //   try {
  //     const res = await api.getTransactionsByCustomer(customer.id);
  //     setTransactions(res.data);
  //   } catch (err) {
  //     console.error("Failed to fetch transactions", err);
  //   }
  // };
  const handleCustomerSelect = async (customer) => {
    setSelectedCustomer(customer);
    try {
      const res = await api.getTransactionsByCustomer(customer.id);

      // Transform the data to match your frontend expectations
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


  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col md:flex-row gap-4">
      <CustomerList
        customers={customers}
        onSelect={handleCustomerSelect}
        selectedId={selectedCustomer?.id}
      />
      {/* <TransactionList transactions={transactions} /> */}
      
      <TransactionList transactions={selectedCustomer?.transactions || []} />
    </div>
  );
};

export default Dashboard;
