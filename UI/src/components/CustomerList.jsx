import React from "react";

const CustomerList = ({ customers, onSelect, selectedId }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 h-full">
      <h2 className="text-xl font-bold mb-4">Customers</h2>
      <ul className="overflow-auto max-h-[70vh]">
        {customers.map((c) => (
          <li
            key={c.id}
            className={`p-2 rounded-md cursor-pointer mb-2 transition ${
              selectedId === c.id ? "bg-blue-100" : "hover:bg-gray-100"
            }`}
            onClick={() => onSelect(c)}
          >
            <div className="font-semibold">{c.name}</div>
            <div className="text-sm text-gray-600">{c.phone}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
