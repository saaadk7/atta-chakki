// import React, { useEffect, useState } from "react";
// import api from "../services/api";
// import TransactionList from "../components/TransactionList";
// import TransactionForm from "../components/TransactionForm";

// const TransactionPage = ({ customerId }) => {
//   const [transactions, setTransactions] = useState([]);
//   const [selectedTx, setSelectedTx] = useState(null);

//   const fetchData = async () => {
//     try {
//       const res = await api.getTransactionsByCustomer(customerId);
//       setTransactions(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [customerId]);

//   const handleDelete = (id) => {
//     setTransactions((prev) => prev.filter((tx) => tx.id !== id));
//   };

//   const handleUpdate = (tx) => {
//     setSelectedTx(tx);
//   };

//   const handleSaveUpdate = async (updatedData) => {
//     try {
//       await api.updateTransaction(updatedData.id, updatedData);
//       setSelectedTx(null);
//       fetchData(); // Refresh
//     } catch (err) {
//       console.error("Update error", err);
//     }
//   };

//   return (
//     <div>
//       <TransactionList
//         transactions={transactions}
//         onDelete={handleDelete}
//         onUpdate={handleUpdate}
//       />

//       {selectedTx && (
//         <TransactionForm
//           initialData={selectedTx}
//           onSave={handleSaveUpdate}
//           onCancel={() => setSelectedTx(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default TransactionPage;
