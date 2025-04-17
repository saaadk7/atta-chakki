// // import React from "react";

// // const CustomerList = ({ customers, onSelect, selectedId }) => {
// //   return (
// //     <div className="bg-white shadow-md rounded-xl p-4 h-full">
// //       <h2 className="text-xl font-bold mb-4">Customers</h2>
// //       <ul className="overflow-auto max-h-[70vh]">
// //         {customers.map((c) => (
// //           <li
// //             key={c.id}
// //             className={`p-2 rounded-md cursor-pointer mb-2 transition ${
// //               selectedId === c.id ? "bg-blue-100" : "hover:bg-gray-100"
// //             }`}
// //             onClick={() => onSelect(c)}
// //           >
// //             <div className="font-semibold">{c.name}</div>
// //             <div className="text-sm text-gray-600">{c.phone}</div>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default CustomerList;
// // src/components/CustomerList.jsx
// //Hello
// import React, { useState } from "react";

// const CustomerList = ({ customers, onSelect, selectedId, onAdd }) => {
//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//    const [customers, setCustomers] = useState([]);


//   const [formData, setFormData] = useState({
//     name: "",
//     contact: "",
//     address: "",
//   });

//   //  const [customers, setCustomers] = useState([]);
//   // const [showAddForm, setShowAddForm] = useState(false);
//   // // const [editingId, setEditingId] = useState(null);
//   // const [notification, setNotification] = useState(null);
//   // const [loading, setLoading] = useState(true);
//   // //const [formData, setFormData] = useState({
//   //   address: "",
//   //   name: "",
//   //   phone: ""



//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // add new customer
//   const handleAddCustomer = async (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.contact || !formData.address) {
//       alert("Please fill in all fields");
//       return;
//     }

//     try {
//       await onAdd(formData); // Call parent to add customer
//       setFormData({ name: "", contact: "", address: "" });
//       setShowForm(false);
//     } catch (error) {
//       console.error("Error adding customer:", error);
//     }
//   };

//   //update customer
//   // Update customer
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.updateCustomer(editingId, {
//         address: formData.address,
//         name: formData.name,
//         phone: formData.phone,
//       });
//       setCustomers((prev) =>
//         prev.map((c) => (c.id === editingId ? response.data : c))
//       );
//       showNotification("Customer updated successfully!");
//       setEditingId(null);
//     } catch (error) {
//       showNotification(
//         error.response?.data?.message || "Failed to update customer",
//         "error"
//       );
//     }
//   };

//   return (
//     <div className="w-full md:w-1/3 bg-white rounded-lg shadow p-4">
//       <h2 className="text-lg font-bold mb-4">Customers</h2>

//       <button
//         className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
//         onClick={() => setShowForm(!showForm)}
//       >
//         {showForm ? "Cancel" : "Add Customer"}
//       </button>

//       {showForm && (
//         <form onSubmit={handleAddCustomer} className="mb-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Customer Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="border px-2 py-1 mb-2 w-full"
//             required
//           />
//           <input
//             type="text"
//             name="contact"
//             placeholder="Contact Info"
//             value={formData.contact}
//             onChange={handleChange}
//             className="border px-2 py-1 mb-2 w-full"
//             required
//           />
//           <input
//             type="text"
//             name="address"
//             placeholder="Address"
//             value={formData.address}
//             onChange={handleChange}
//             className="border px-2 py-1 mb-2 w-full"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-green-600 text-white px-4 py-2 rounded w-full"
//           >
//             Save
//           </button>
//         </form>
//       )}

//       <ul>
//         {customers.map((customer) => (
//           <li
//             key={customer.id}
//             className={`p-2 border rounded mb-2 cursor-pointer ${
//               selectedId === customer.id ? "bg-gray-200" : ""
//             }`}
//             onClick={() => onSelect(customer)}
//           >
//             <div className="font-semibold">{customer.name}</div>
//             <div className="text-sm text-gray-600">{customer.contact}</div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CustomerList;
