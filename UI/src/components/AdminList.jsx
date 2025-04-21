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
        // Sort by id (ascending)
        const sortedAdmins = res.data.sort((a, b) => a.id - b.id);
        setAdmins(sortedAdmins);
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
      <h2 className="text-2xl font-bold mb-4">Admin List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : admins.length === 0 ? (
        <p>No admins found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-100 text-blue-900">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Super Admin</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{admin.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {admin.username}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {admin.superAdmin ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() =>
                      handleToggleStatus(admin.id, admin.superAdmin)
                    }
                    className={`px-4 py-1 rounded-full text-white text-sm font-semibold ${
                      admin.superAdmin
                        ? "bg-gray-400 cursor-not-allowed"
                        : admin.status
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                    disabled={admin.superAdmin}
                  >
                    {admin.status ? "Active" : "Deactive"}
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(admin.id, admin.superAdmin)}
                    className={`px-4 py-1 rounded text-sm font-semibold ${
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
