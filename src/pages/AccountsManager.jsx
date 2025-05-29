import React, { useState, useEffect } from "react";
import useUsers from "../hooks/useUsers";

export default function AccountsManager() {
  const {
    users,
    loading,
    message,
    createUser,
    editUser,
    removeUser,
    setMessage,
  } = useUsers();

  const [form, setForm] = useState({ name: "", email: "", role: "Admin" });
  const [editId, setEditId] = useState(null);

  const [filter, setFilter] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [deleteWarning, setDeleteWarning] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (!loading) {
      resetForm();
    }
  }, [loading]);

  useEffect(() => {
    if (filter.trim() === "") {
      setFilteredUsers(users);
    } else {
      const lowerFilter = filter.toLowerCase();
      setFilteredUsers(
        users.filter(
          (u) =>
            u.name.toLowerCase().includes(lowerFilter) ||
            u.email.toLowerCase().includes(lowerFilter) ||
            u.role.toLowerCase().includes(lowerFilter)
        )
      );
    }
  }, [users, filter]);

  useEffect(() => {
    if (deleteWarning) {
      const timer = setTimeout(() => setDeleteWarning(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [deleteWarning]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm({ name: "", email: "", role: "Admin" });
    setEditId(null);
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await editUser({ ...form, id: editId });
    } else {
      await createUser(form);
    }
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email, role: user.role });
    setEditId(user.id);
    setMessage(null);
  };

  const handleDelete = (id) => {
    setDeleteWarning("Are you sure you want to delete this user?");
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (deleteId !== null) {
      await removeUser(deleteId);
      if (editId === deleteId) resetForm();
      setDeleteWarning("User deleted successfully.");
      setDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteWarning(null);
    setDeleteId(null);
  };

  const firstFiveUsers = users.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <HeaderSection />

      <div className="grid md:grid-cols-2 gap-10 mt-8">
        {/* Form Section */}
        <section className="bg-white rounded-xl shadow-md p-6 border border-black">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            {editId ? "Edit User" : "Add New Account"}
          </h2>
          {message && (
            <div
              className={`mb-4 px-4 py-2 rounded ${
                message.toLowerCase().includes("error")
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
              role="alert"
            >
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              disabled={loading}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              disabled={loading}
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              disabled={loading}
            >
              <option value="SuperAdmin">SuperAdmin</option>
              <option value="Admin">Admin</option>
              <option value="Salesman">Salesman</option>
            </select>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition-colors duration-200`}
            >
              {loading
                ? editId
                  ? "Updating..."
                  : "Adding..."
                : editId
                ? "Update"
                : "Add"}
            </button>
            {editId && !loading && (
              <button
                type="button"
                onClick={resetForm}
                className="w-full py-2 rounded-lg text-gray-700 border border-gray-400 hover:bg-gray-100 transition-colors duration-200"
              >
                Cancel Edit
              </button>
            )}
          </form>
        </section>

        {/* First Table Section - 5 Users Preview */}
        <section className="bg-white rounded-xl shadow-md p-6 border border-black overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Users Preview (First 5)
          </h2>
          <table className="w-full min-w-[450px] border-collapse text-gray-800">
            <thead>
              <tr className="border-b border-gray-400 bg-gray-100">
                <th className="py-3 px-3 text-left text-sm sm:text-base">
                  Name
                </th>
                <th className="py-3 px-3 text-left text-sm sm:text-base hidden sm:table-cell">
                  Email
                </th>
                <th className="py-3 px-3 text-left text-sm sm:text-base">
                  Role
                </th>
                <th className="py-3 px-3 text-left text-sm sm:text-base">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {firstFiveUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-4 text-gray-600 text-sm sm:text-base"
                  >
                    {loading ? "Loading users..." : "No users found."}
                  </td>
                </tr>
              ) : (
                firstFiveUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-3 text-sm sm:text-base">
                      {user.name}
                    </td>
                    <td className="py-3 px-3 text-sm sm:text-base hidden sm:table-cell break-all">
                      {user.email}
                    </td>
                    <td className="py-3 px-3 text-sm sm:text-base">
                      {user.role}
                    </td>
                    <td className="py-3 px-3 flex space-x-3">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-700 hover:underline text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-2 py-1"
                        aria-label={`Edit ${user.name}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-700 hover:underline text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-600 rounded px-2 py-1"
                        aria-label={`Delete ${user.name}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </div>

      {/* ---- قسم الفلترة والجدول الجديد ----- */}
      <section className="mt-12 bg-white rounded-xl shadow-md p-6 border border-black">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">All Users</h2>
        <input
          type="text"
          placeholder="Search by name, email, or role..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-gray-800">
            <thead>
              <tr className="border-b border-gray-400 bg-gray-100">
                <th className="py-3 px-3 text-left text-sm sm:text-base">
                  Name
                </th>
                <th className="py-3 px-3 text-left text-sm sm:text-base">
                  Email
                </th>
                <th className="py-3 px-3 text-left text-sm sm:text-base">
                  Role
                </th>
                <th className="py-3 px-3 text-left text-sm sm:text-base">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-4 text-gray-600 text-sm sm:text-base"
                  >
                    {loading ? "Loading users..." : "No matching users found."}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-3 text-sm sm:text-base">
                      {user.name}
                    </td>
                    <td className="py-3 px-3 text-sm sm:text-base break-all">
                      {user.email}
                    </td>
                    <td className="py-3 px-3 text-sm sm:text-base">
                      {user.role}
                    </td>
                    <td className="py-3 px-3 flex space-x-3">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-700 hover:underline text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-2 py-1"
                        aria-label={`Edit ${user.name}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-700 hover:underline text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-600 rounded px-2 py-1"
                        aria-label={`Delete ${user.name}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {deleteWarning && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-warning-title"
        >
          <div className="bg-white rounded-lg p-6 max-w-sm w-full border border-black shadow-lg">
            <h3
              id="delete-warning-title"
              className="text-lg font-semibold mb-4 text-gray-900"
            >
              {deleteWarning}
            </h3>
            {deleteWarning.includes("sure") ? (
              <div className="flex justify-end space-x-4">
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  Confirm
                </button>
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                OK
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function HeaderSection() {
  return (
    <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 sm:gap-0">
      <h1 className="text-3xl font-bold text-gray-900">Accounts Manager</h1>
      <p className="text-gray-700 max-w-sm">
        Manage user accounts easily. Add, edit, delete, and filter users
        quickly.
      </p>
    </header>
  );
}
