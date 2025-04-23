// File: src/components/CustomerList2.jsx

import React, { useState, useEffect } from "react";
import api from "../services/api";

const CustomerList = ({ onSelectCustomer, selectedCustomerId }) => {
  const [customers, setCustomers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    address: "",
    name: "",
    phone: "",
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const response = await api.getAllCustomers();
        setCustomers(response.data);
      } catch (error) {
        showNotification("Failed to load customers", "error");
      } finally {
        setLoading(false);
      }
    };
    loadCustomers();
  }, []);



  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await api.addCustomer(formData);
      setCustomers((prev) => [...prev, response.data]);
      showNotification("Customer added successfully!");
      setShowAddForm(false);
      setFormData({ address: "", name: "", phone: "" });
    } catch (error) {
      showNotification("Failed to add customer", "error");
    }
  };



  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.updateCustomer(editingId, formData);
      setCustomers((prev) =>
        prev.map((c) => (c.id === editingId ? response.data : c))
      );
      showNotification("Customer updated successfully!");
      setEditingId(null);
    } catch (error) {
      showNotification("Failed to update customer", "error");
    }
  };

  const confirmDelete = (id) => {
    setCustomerToDelete(id);
    setShowConfirmModal(true);
  };

  const deleteConfirmed = async () => {
    try {
      await api.deleteCustomer(customerToDelete);
      setCustomers((prev) => prev.filter((c) => c.id !== customerToDelete));
      showNotification("Customer deleted successfully!");
      if (selectedCustomerId === customerToDelete) {
        onSelectCustomer(null);
      }
    } catch (error) {
      showNotification("Failed to delete customer", "error");
    } finally {
      setShowConfirmModal(false);
      setCustomerToDelete(null);
    }
  };

  const startEditing = (customer) => {
    setEditingId(customer.id);
    setFormData({
      address: customer.address,
      name: customer.name,
      phone: customer.phone,
    });
  };

  if (loading) {
    return <div className="p-4 text-center">Loading customers...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-4 h-full relative">
      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${
            notification.type === "error"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md">
            <h2 className="text-lg font-bold mb-4 text-gray-800">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this customer?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={deleteConfirmed}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Customers</h2>
        {!editingId && (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            Add Customer
          </button>
        )}
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold mb-3">Add New Customer</h3>
          <form onSubmit={handleAdd}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone*
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address*
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  rows="3"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save Customer
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Form */}
      {editingId && (
        <div className="mb-6 p-4 border rounded-lg bg-blue-50">
          <h3 className="text-lg font-semibold mb-3">Edit Customer</h3>
          <form onSubmit={handleUpdate}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address*
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone*
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update Customer
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Customer List */}
      <ul className="overflow-auto max-h-[70vh]">
        {customers.length > 0 ? (
          customers.map((customer) => (
            <li
              key={customer.id}
              className={`p-3 mb-2 rounded-md cursor-pointer ${
                editingId === customer.id
                  ? "bg-blue-50"
                  : selectedCustomerId === customer.id
                  ? "bg-blue-100 border-l-4 border-blue-500"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => onSelectCustomer(customer.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">{customer.name}</div>
                  <div className="text-sm text-gray-600">{customer.phone}</div>
                  <div className="text-sm text-gray-500">
                    {customer.address}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(customer);
                    }}
                    className="text-blue-500 hover:text-blue-700 text-sm px-2 py-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmDelete(customer.id);
                    }}
                    className="text-red-500 hover:text-red-700 text-sm px-2 py-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="p-4 text-center text-gray-500">
            {!showAddForm && !editingId && (
              <>
                No customers found.{" "}
                <button
                  onClick={() => setShowAddForm(true)}
                  className="text-blue-500 hover:text-blue-700 font-medium"
                >
                  Add your first customer
                </button>
              </>
            )}
          </li>
        )}
      </ul>
    </div>
  );
};

export default CustomerList;


