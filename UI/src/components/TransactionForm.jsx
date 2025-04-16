// import React, { useState } from "react";

// const TransactionForm = ({ initialData, onSave, onCancel }) => {
//   const [formData, setFormData] = useState(initialData);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const parsedValue =
//       name === "quantity" || name === "unitPrice" ? parseFloat(value) : value;
//     setFormData((prev) => ({ ...prev, [name]: parsedValue }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const total = formData.quantity * formData.unitPrice;
//     onSave({ ...formData, total });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mt-4">
//       <h2 className="text-lg font-semibold mb-4">Edit Transaction</h2>
//       <div className="grid grid-cols-2 gap-4">
//         <input
//           name="flourType"
//           value={formData.flourType}
//           onChange={handleChange}
//           placeholder="Flour Type"
//           className="p-2 border rounded"
//         />
//         <input
//           type="datetime-local"
//           name="inTime"
//           value={formData.inTime.slice(0, 16)}
//           onChange={handleChange}
//           className="p-2 border rounded"
//         />
//         <input
//           type="datetime-local"
//           name="outTime"
//           value={formData.outTime.slice(0, 16)}
//           onChange={handleChange}
//           className="p-2 border rounded"
//         />
//         <input
//           type="number"
//           name="quantity"
//           value={formData.quantity}
//           onChange={handleChange}
//           placeholder="Quantity (kg)"
//           className="p-2 border rounded"
//         />
//         <input
//           type="number"
//           name="unitPrice"
//           value={formData.unitPrice}
//           onChange={handleChange}
//           placeholder="Unit Price"
//           className="p-2 border rounded"
//         />
//       </div>
//       <div className="mt-4 flex gap-4">
//         <button
//           type="submit"
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Save
//         </button>
//         <button
//           onClick={onCancel}
//           type="button"
//           className="bg-gray-500 text-white px-4 py-2 rounded"
//         >
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// };

// export default TransactionForm;
