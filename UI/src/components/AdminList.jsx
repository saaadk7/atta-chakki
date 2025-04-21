// src/pages/AdminList.jsx

import React, { useEffect, useState } from "react";
import api from "../services/api";
 // assuming this function is in api.js

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   api.getAllAdmins()
      .then((res) => {
        setAdmins(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch admins:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : admins.length === 0 ? (
        <p>No admins found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td className="border border-gray-300 px-4 py-2">{admin.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {admin.username}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminList;
