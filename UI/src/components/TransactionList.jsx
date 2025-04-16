

// import React from "react";

// const TransactionList = ({ transactions }) => {
//   if (!transactions?.length) {
//     return (
//       <div className="w-full md:w-2/3 p-4 bg-white rounded-lg shadow">
//         {" "}
//         <p className="text-gray-500">No transactions found.</p>{" "}
//       </div>
//     );
//   }

//   return (
//     <div className="w-full md:w-2/3 p-4 bg-white rounded-lg shadow overflow-auto">
//       {" "}
//       <h2 className="text-xl font-bold mb-4">Transactions</h2>{" "}
//       <table className="min-w-full text-sm text-left text-gray-700">
//         {" "}
//         <thead className="bg-gray-100">
//           {" "}
//           <tr>
//             {" "}
//             <th className="px-4 py-2">Flour Type</th>{" "}
//             <th className="px-4 py-2">In Time</th>{" "}
//             <th className="px-4 py-2">Out Time</th>{" "}
//             <th className="px-4 py-2">Quantity</th>{" "}
//             <th className="px-4 py-2">Unit Price</th>{" "}
//             <th className="px-4 py-2">Total</th>{" "}
//           </tr>{" "}
//         </thead>{" "}
//         {/* <tbody>
//           {" "}
//           {transactions.map((t) => (
//             <tr key={t.id} className="border-b">
//               {" "}
//               <td className="px-4 py-2">{t.flour_type}</td>{" "}
//               <td className="px-4 py-2">{t.in_time}</td>{" "}
//               <td className="px-4 py-2">{t.out_time}</td>{" "}
//               <td className="px-4 py-2">{t.quantity}</td>{" "}
//               <td className="px-4 py-2">₹ {t.unit_price}</td>{" "}
//               <td className="px-4 py-2">₹ {t.total}</td>{" "}
//             </tr>
//           ))}{" "}
//         </tbody>{" "} */}
//         // In the table body section:
//         <tbody>
//           {transactions.map((t) => (
//             <tr key={t.id} className="border-b">
//               <td className="px-4 py-2">{t.flourType}</td>
//               <td className="px-4 py-2">
//                 {new Date(t.inTime).toLocaleString()}
//               </td>
//               <td className="px-4 py-2">
//                 {new Date(t.outTime).toLocaleString()}
//               </td>
//               <td className="px-4 py-2">{t.quantity}</td>
//               <td className="px-4 py-2">₹ {t.unitPrice}</td>
//               <td className="px-4 py-2">₹ {t.total}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>{" "}
//     </div>
//   );
// };

// export default TransactionList;


// src/components/TransactionList.jsx
import React from "react";

const TransactionList = ({ transactions }) => {
  // Format date for clean display
  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Format currency for Indian Rupees
  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return "₹ 0";
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  if (!transactions?.length) {
    return (
      <div className="w-full md:w-2/3 p-4 bg-white rounded-lg shadow">
        <p className="text-gray-500">No transactions found for this customer.</p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-2/3 p-4 bg-white rounded-lg shadow overflow-auto">
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3"> ID</th>
              <th className="px-4 py-3">Flour Type</th>
              <th className="px-4 py-3">In Time</th>
              <th className="px-4 py-3">Out Time</th>
              <th className="px-4 py-3 text-right">Qty (kg)</th>
              <th className="px-4 py-3 text-right">Rate (₹/kg)</th>
              <th className="px-4 py-3 text-right">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-gray-500">{txn.id}</td>
                <td className="px-4 py-3 font-medium">{txn.flourType}</td>
                <td className="px-4 py-3">{formatDateTime(txn.inTime)}</td>
                <td className="px-4 py-3">{formatDateTime(txn.outTime)}</td>
                <td className="px-4 py-3 text-right">{txn.quantity}</td>
                <td className="px-4 py-3 text-right">{formatCurrency(txn.unitPrice)}</td>
                <td className="px-4 py-3 text-right font-semibold">
                  {formatCurrency(txn.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;