import React, { useState, useEffect } from "react";
import api from "../services/api"; // assuming this is where your api methods are located
import CustomerList from "./CustomerList";

const CustomerManager = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch customers when the component mounts
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await api.getAllCustomers();
      setCustomers(res.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // Handle selecting a customer from the list
  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  // Handle input changes for the customer form
  const handleInputChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  // Save or update customer
  const handleSaveCustomer = async () => {
    try {
      if (editingId) {
        await api.updateCustomer(editingId, newCustomer); // Update the customer
      } else {
        await api.addCustomer(newCustomer); // Add new customer
      }
      setNewCustomer({ name: "", phone: "", address: "" });
      setEditingId(null);
      setShowForm(false);
      fetchCustomers(); // Refresh the customer list
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  // Edit customer (populate form with existing data)
  const handleEdit = (customer) => {
    setNewCustomer({
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
    });
    setEditingId(customer.id); // Set the editing ID for update
    setShowForm(true); // Show the form for editing
  };

  // Delete customer
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await api.deleteCustomer(id);
        fetchCustomers(); // Refresh the customer list
        if (selectedCustomer?.id === id) {
          setSelectedCustomer(null); // Deselect if the deleted customer was selected
        }
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
      {/* Customer List */}
      <CustomerList
        customers={customers}
        onSelect={handleSelectCustomer}
        onEdit={handleEdit}
        onDelete={handleDelete}
        selectedId={selectedCustomer?.id}
      />

      {/* Customer Form & Add Button */}
      <div>
        {/* Show Add Customer button */}
        {!showForm && (
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-4"
            onClick={() => {
              setShowForm(true);
              setNewCustomer({ name: "", phone: "", address: "" });
              setEditingId(null);
            }}
          >
            Add Customer
          </button>
        )}

        {/* Show form when Add/Edit is triggered */}
        {showForm && (
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newCustomer.name}
              onChange={handleInputChange}
              className="border p-2 mr-2 mb-2"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={newCustomer.phone}
              onChange={handleInputChange}
              className="border p-2 mr-2 mb-2"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={newCustomer.address}
              onChange={handleInputChange}
              className="border p-2 mr-2 mb-2"
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
              onClick={handleSaveCustomer}
            >
              {editingId ? "Update" : "Save"}
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              onClick={() => {
                setShowForm(false);
                setNewCustomer({ name: "", phone: "", address: "" });
                setEditingId(null);
              }}
            >
              Cancel
            </button>
          </div>
        )}

        {/* If customer is selected */}
        {selectedCustomer && (
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold mb-2">
              Transactions for {selectedCustomer.name}
            </h3>

            {/* Display transactions here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerManager;
