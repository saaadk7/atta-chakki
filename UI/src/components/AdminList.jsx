

import React, { useEffect, useState } from "react";
import api from "../services/api";
import Swal from "sweetalert2";

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdmins = () => {
    api
      .getAllAdmins()
      .then((res) => {
        const sorted = res.data.sort((a, b) => a.id - b.id);
        setAdmins(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch admins:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleToggleStatus = (id, isSuperAdmin) => {
    if (isSuperAdmin) return;
    api
      .toggleAdminStatus(id)
      .then(() => fetchAdmins())
      .catch((err) => console.error("Toggle failed:", err));
  };

  const handleDelete = (id, isSuperAdmin) => {
    if (isSuperAdmin) return;

    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .deleteAdmin(id)
          .then(() => {
            Swal.fire("Deleted!", "Admin has been deleted.", "success");
            fetchAdmins();
          })
          .catch((err) => {
            console.error("Delete failed:", err);
            Swal.fire("Error!", "Something went wrong!", "error");
          });
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-left">Admin List</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : admins.length === 0 ? (
        <p className="text-center">No admins found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-100 text-blue-900">
              <th className="border border-gray-300 px-4 py-2 w-16">ID</th>
              <th className="border border-gray-300 px-4 py-2 w-48">
                Username
              </th>
              <th className="border border-gray-300 px-4 py-2 w-32">
                Super Admin
              </th>
              <th className="border border-gray-300 px-4 py-2 w-32">Status</th>
              <th className="border border-gray-300 px-4 py-2 w-32">Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="hover:bg-gray-50 text-center">
                <td className="border border-gray-300 px-4 py-2">{admin.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {admin.username}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {admin.superAdmin ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={admin.status}
                      onChange={() =>
                        handleToggleStatus(admin.id, admin.superAdmin)
                      }
                      disabled={admin.superAdmin}
                      className="sr-only peer"
                    />
                    <div
                      className={`w-11 h-6 rounded-full peer 
                        transition-colors duration-300 
                        ${
                          admin.superAdmin
                            ? "bg-gray-400"
                            : admin.status
                            ? "bg-green-500 peer-checked:bg-green-600"
                            : "bg-red-500 peer-checked:bg-green-500"
                        }`}
                    ></div>
                    <div
                      className={`absolute left-0 top-0.5 ml-1 w-4 h-4 bg-white rounded-full shadow-md 
                        transition-transform duration-300 transform 
                        peer-checked:translate-x-5`}
                    ></div>
                  </label>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleDelete(admin.id, admin.superAdmin)}
                    className={`px-3 py-1 text-sm rounded ${
                      admin.superAdmin
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                    disabled={admin.superAdmin}
                  >
                    Delete
                  </button>
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
