// // TransactionList.jsx

// import React, { useState, useEffect } from "react";
// import api from "../services/api";

// const TransactionList = ({ customerId }) => {
//   const [transactions, setTransactions] = useState([]);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [notification, setNotification] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     flourType: "",
//     inTime: "",
//     outTime: "",
//     quantity: "",
//     unitPrice: "",
//   });

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       if (customerId) {
//         setIsLoading(true);
//         try {
//           const res = await api.getTransactionsByCustomer(customerId);
//           setTransactions(res.data);
//           setShowAddForm(false);
//           setEditingId(null);
//         } catch (error) {
//           showNotification("Failed to fetch transactions", "error");
//         } finally {
//           setIsLoading(false);
//         }
//       } else {
//         setTransactions([]);
//       }
//     };
//     fetchTransactions();
//   }, [customerId]);

//   const showNotification = (message, type = "success") => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(null), 3000);
//   };

//   const formatDateTime = (dateString) => {
//     if (!dateString) return "-";
//     const date = new Date(dateString);
//     return date.toLocaleString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const formatCurrency = (amount) => {
//     if (amount === undefined || amount === null) return "₹ 0";
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 2,
//     }).format(amount);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.addTransaction({
//         ...formData,
//         quantity: parseFloat(formData.quantity),
//         unitPrice: parseFloat(formData.unitPrice),
//         customer: { id: customerId },
//       });
//       setTransactions((prev) => [...prev, response.data]);
//       showNotification("Transaction added successfully!");
//       setShowAddForm(false);
//       setFormData({
//         flourType: "",
//         inTime: "",
//         outTime: "",
//         quantity: "",
//         unitPrice: "",
//       });
//     } catch (error) {
//       showNotification("Failed to add transaction", "error");
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.updateTransaction(editingId, {
//         ...formData,
//         quantity: parseFloat(formData.quantity),
//         unitPrice: parseFloat(formData.unitPrice),
//       });
//       setTransactions((prev) =>
//         prev.map((txn) => (txn.id === editingId ? response.data : txn))
//       );
//       showNotification("Transaction updated successfully!");
//       setEditingId(null);
//     } catch (error) {
//       showNotification("Failed to update transaction", "error");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this transaction?"))
//       return;
//     try {
//       await api.deleteTransaction(id);
//       setTransactions((prev) => prev.filter((txn) => txn.id !== id));
//       showNotification("Transaction deleted successfully!");
//     } catch (error) {
//       showNotification("Failed to delete transaction", "error");
//     }
//   };

//   const startEditing = (txn) => {
//     setEditingId(txn.id);
//     setFormData({
//       flourType: txn.flourType,
//       inTime: txn.inTime?.split(".")[0] || "",
//       outTime: txn.outTime?.split(".")[0] || "",
//       quantity: txn.quantity,
//       unitPrice: txn.unitPrice,
//     });
//   };

//   if (isLoading) {
//     return (
//       <div className="w-full md:w-2/3 p-4 bg-white rounded-lg shadow">
//         <p className="text-gray-500">Loading transactions...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full p-4 bg-white rounded-lg shadow overflow-auto">
//       {notification && (
//         <div
//           className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${
//             notification.type === "error"
//               ? "bg-red-100 text-red-800"
//               : "bg-green-100 text-green-800"
//           }`}
//         >
//           {notification.message}
//         </div>
//       )}

//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Transaction History</h2>
//         {!editingId && customerId && (
//           <button
//             onClick={() => setShowAddForm(true)}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             Add Transaction
//           </button>
//         )}
//       </div>

//       {showAddForm && (
//         <div className="mb-6 p-4 border rounded-lg bg-gray-50">
//           <h3 className="text-lg font-semibold mb-3">Add New Transaction</h3>
//           <form onSubmit={handleAdd}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Flour Type
//                 </label>
//                 <input
//                   type="text"
//                   name="flourType"
//                   value={formData.flourType}
//                   onChange={handleInputChange}
//                   required
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Quantity (kg)
//                 </label>
//                 <input
//                   type="number"
//                   name="quantity"
//                   value={formData.quantity}
//                   onChange={handleInputChange}
//                   step="0.01"
//                   required
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Unit Price (₹)
//                 </label>
//                 <input
//                   type="number"
//                   name="unitPrice"
//                   value={formData.unitPrice}
//                   onChange={handleInputChange}
//                   step="0.01"
//                   required
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   In Time
//                 </label>
//                 <input
//                   type="datetime-local"
//                   name="inTime"
//                   value={formData.inTime}
//                   onChange={handleInputChange}
//                   required
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Out Time
//                 </label>
//                 <input
//                   type="datetime-local"
//                   name="outTime"
//                   value={formData.outTime}
//                   onChange={handleInputChange}
//                   required
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                 />
//               </div>
//             </div>
//             <div className="mt-4 flex justify-end space-x-2">
//               <button
//                 type="button"
//                 onClick={() => setShowAddForm(false)}
//                 className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//               >
//                 Save Transaction
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {editingId && (
//         <div className="mb-6 p-4 border rounded-lg bg-blue-50">
//           <h3 className="text-lg font-semibold mb-3">Edit Transaction</h3>
//           <form onSubmit={handleUpdate}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Flour Type
//                 </label>
//                 <input
//                   type="text"
//                   name="flourType"
//                   value={formData.flourType}
//                   onChange={handleInputChange}
//                   required
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Quantity (kg)
//                 </label>
//                 <input
//                   type="number"
//                   name="quantity"
//                   value={formData.quantity}
//                   onChange={handleInputChange}
//                   step="0.01"
//                   required
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Unit Price (₹)
//                 </label>
//                 <input
//                   type="number"
//                   name="unitPrice"
//                   value={formData.unitPrice}
//                   onChange={handleInputChange}
//                   step="0.01"
//                   required
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   In Time
//                 </label>
//                 <input
//                   type="datetime-local"
//                   name="inTime"
//                   value={formData.inTime}
//                   onChange={handleInputChange}
//                   required
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Out Time
//                 </label>
//                 <input
//                   type="datetime-local"
//                   name="outTime"
//                   value={formData.outTime}
//                   onChange={handleInputChange}
//                   required
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                 />
//               </div>
//             </div>
//             <div className="mt-4 flex justify-end space-x-2">
//               <button
//                 type="button"
//                 onClick={() => setEditingId(null)}
//                 className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               >
//                 Update Transaction
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {!showAddForm && !editingId && (
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm text-left text-gray-700">
//             <thead className="bg-gray-100 text-gray-700 uppercase">
//               <tr>
//                 <th className="px-4 py-3">Transaction Id</th>
//                 <th className="px-4 py-3">Flour Type</th>
//                 <th className="px-4 py-3">In Time</th>
//                 <th className="px-4 py-3">Out Time</th>
//                 <th className="px-4 py-3 text-right">Qty (kg)</th>
//                 <th className="px-4 py-3 text-right">Rate per(₹/kg)</th>
//                 <th className="px-4 py-3 text-right">Total Amount (₹)</th>
//                 <th className="px-4 py-3  text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {transactions.length > 0 ? (
//                 transactions.map((txn) => (
//                   <tr key={txn.id} className="border-b hover:bg-gray-50">
//                     <td className="px-4 py-3 font-medium">{txn.id}</td>
//                     <td className="px-4 py-3 font-medium">{txn.flourType}</td>
//                     <td className="px-4 py-3">{formatDateTime(txn.inTime)}</td>
//                     <td className="px-4 py-3">{formatDateTime(txn.outTime)}</td>
//                     <td className="px-4 py-3 text-right">{txn.quantity}</td>
//                     <td className="px-4 py-3 text-right">
//                       {formatCurrency(txn.unitPrice)}
//                     </td>
//                     <td className="px-4 py-3 text-right font-semibold">
//                       {formatCurrency(txn.quantity * txn.unitPrice)}
//                     </td>
//                     <td className="px-4 py-3  text-right">
//                       <button
//                         onClick={() => startEditing(txn)}
//                         className="px-2 py-1 mb-2 w-15 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 "
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(txn.id)}
//                         className="px-2 py-1 w-15 text-sm text-white bg-red-500 rounded hover:bg-red-600"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="8"
//                     className="px-4 py-3 text-center text-gray-500"
//                   >
//                     {customerId
//                       ? "No transactions found for this customer"
//                       : "Select a customer to view transactions"}
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TransactionList;

import React, { useState, useEffect } from "react";
import api from "../services/api";
import jsPDF from "jspdf";
import "jspdf-autotable";

const TransactionList = ({ customerId }) => {
  const [transactions, setTransactions] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    flourType: "",
    inTime: "",
    outTime: "",
    quantity: "",
    unitPrice: "",
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      if (customerId) {
        setIsLoading(true);
        try {
          const res = await api.getTransactionsByCustomer(customerId);
          setTransactions(res.data);
          setShowAddForm(false);
          setEditingId(null);
        } catch (error) {
          showNotification("Failed to fetch transactions", "error");
        } finally {
          setIsLoading(false);
        }
      } else {
        setTransactions([]);
      }
    };
    fetchTransactions();
  }, [customerId]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return "₹ 0";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await api.addTransaction({
        ...formData,
        quantity: parseFloat(formData.quantity),
        unitPrice: parseFloat(formData.unitPrice),
        customer: { id: customerId },
      });
      setTransactions((prev) => [...prev, response.data]);
      showNotification("Transaction added successfully!");
      setShowAddForm(false);
      setFormData({
        flourType: "",
        inTime: "",
        outTime: "",
        quantity: "",
        unitPrice: "",
      });
    } catch (error) {
      showNotification("Failed to add transaction", "error");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.updateTransaction(editingId, {
        ...formData,
        quantity: parseFloat(formData.quantity),
        unitPrice: parseFloat(formData.unitPrice),
      });
      setTransactions((prev) =>
        prev.map((txn) => (txn.id === editingId ? response.data : txn))
      );
      showNotification("Transaction updated successfully!");
      setEditingId(null);
    } catch (error) {
      showNotification("Failed to update transaction", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;
    try {
      await api.deleteTransaction(id);
      setTransactions((prev) => prev.filter((txn) => txn.id !== id));
      showNotification("Transaction deleted successfully!");
    } catch (error) {
      showNotification("Failed to delete transaction", "error");
    }
  };

  const startEditing = (txn) => {
    setEditingId(txn.id);
    setFormData({
      flourType: txn.flourType,
      inTime: txn.inTime?.split(".")[0] || "",
      outTime: txn.outTime?.split(".")[0] || "",
      quantity: txn.quantity,
      unitPrice: txn.unitPrice,
    });
  };

  const handleDownloadPDF = (txn) => {
    const doc = new jsPDF();
    doc.text("Transaction Receipt", 14, 10);
    doc.autoTable({
      startY: 20,
      head: [["Field", "Value"]],
      body: [
        // ["Transaction ID", txn.],
        // ["Transaction ID", txn.customerI],
        // ["Transaction ID", txn.id],
        ["Customer Name", txn.customerName],
        ["Flour Type", txn.flourType],
        ["In Time", formatDateTime(txn.inTime)],
        ["Out Time", formatDateTime(txn.outTime)],
        ["Quantity", txn.quantity],
        ["Unit Price", formatCurrency(txn.unitPrice)],
        ["Total", formatCurrency(txn.unitPrice * txn.quantity)],
      ],
    });
    doc.save(`Transaction-${txn.id}.pdf`);
  };

  if (isLoading) {
    return (
      <div className="w-full md:w-2/3 p-4 bg-white rounded-lg shadow">
        <p className="text-gray-500">Loading transactions...</p>
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow overflow-auto">
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

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Transaction History</h2>
        {!editingId && customerId && (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            Add Transaction
          </button>
        )}
      </div>

      {(showAddForm || editingId) && (
        <form
          onSubmit={editingId ? handleUpdate : handleAdd}
          className="mb-4 space-y-4"
        >
          {/* <input
            type="text"
            name="flourType"
            value={formData.flourType}
            onChange={handleInputChange}
            placeholder="Flour Type"
            className="border p-2 w-full"
            required
          /> */}
          <select
            name="flourType"
            value={formData.flourType}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          >
            <option value="">Select Flour Type</option>
            <option value="Wheat Flour">Wheat Flour</option>
            <option value="Jawar Flour">Jawar Flour</option>
            <option value="Bajra Flour">Bajra Flour</option>
            <option value="Chilly Powder">Chilly Powder</option>
            <option value="Mung">Mung</option>
            <option value="Makka">Makka</option>
          </select>
          <input
            type="datetime-local"
            name="inTime"
            value={formData.inTime}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
          <input
            type="datetime-local"
            name="outTime"
            value={formData.outTime}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            className="border p-2 w-full"
            required
          />
          <input
            type="number"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleInputChange}
            placeholder="Unit Price"
            className="border p-2 w-full"
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {editingId ? "Update" : "Add"} Transaction
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setEditingId(null);
                setFormData({
                  flourType: "",
                  inTime: "",
                  outTime: "",
                  quantity: "",
                  unitPrice: "",
                });
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {!showAddForm && !editingId && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-3">Transaction ID</th>
                <th className="px-4 py-3">Flour Type</th>
                <th className="px-4 py-3">In Time</th>
                <th className="px-4 py-3">Out Time</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Unit Price</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id} className="border-b">
                  <td className="px-4 py-3">{txn.id}</td>
                  <td className="px-4 py-3">{txn.flourType}</td>
                  <td className="px-4 py-3">{formatDateTime(txn.inTime)}</td>
                  <td className="px-4 py-3">{formatDateTime(txn.outTime)}</td>
                  <td className="px-4 py-3">{txn.quantity}</td>
                  <td className="px-4 py-3">{formatCurrency(txn.unitPrice)}</td>
                  <td className="px-4 py-3">
                    {formatCurrency(txn.unitPrice * txn.quantity)}
                  </td>
                  <td className="px-4 py-3 space-y-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing(txn)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(txn.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                    <button
                      onClick={() => handleDownloadPDF(txn)}
                      className="w-30 h-10 bg-purple-500 text-white py-2 px-4 rounded text-sm hover:bg-purple-700"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
