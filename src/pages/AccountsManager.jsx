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

  // Added password to form state and showPassword state for toggling visibility
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Admin",
    password: "",
  });
  const [editId, setEditId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

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

  // Reset form including password and hide password toggle
  const resetForm = () => {
    setForm({ name: "", email: "", role: "Admin", password: "" });
    setEditId(null);
    setShowPassword(false);
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields for creation (password is required)
    if (!form.name.trim() || !form.email.trim() || !form.role.trim()) {
      setMessage("Error: Name, Email, and Role are required.");
      return;
    }

    // When creating a new user, password must be provided
    if (!editId && !form.password.trim()) {
      setMessage("Error: Password is required when creating a new user.");
      return;
    }

    // For update, password is optional; if empty, do not send or change it
    const userData = {
      ...form,
      id: editId || undefined,
    };

    // If updating and password is empty, remove password property to avoid changes
    if (editId && !form.password.trim()) {
      delete userData.password;
    }

    // Call update or create API accordingly
    if (editId) {
      await editUser(userData);
    } else {
      await createUser(userData);
    }
  };

  const handleEdit = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      password: "",
    });
    // Password is not loaded for security, user must enter new password if they want to change it
    setEditId(user.id);
    setShowPassword(false);
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

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const firstFiveUsers = users.slice(0, 5);
  const allowPassSkip = true;
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
            {/* Name input */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required={!editId || (editId && !allowPassSkip)}
              disabled={loading}
            />
            {/* Email input */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required={!editId || (editId && !allowPassSkip)}
              disabled={loading}
            />
            {/* Role select */}
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required={!editId || (editId && !allowPassSkip)}
              disabled={loading}
            >
              <option value="SuperAdmin">SuperAdmin</option>
              <option value="Admin">Admin</option>
              <option value="Salesman">Salesman</option>
            </select>
            {/* Password input with show/hide toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required={!editId || (editId && !allowPassSkip)}
                disabled={loading}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600 hover:text-gray-900 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Submit button */}
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
            {/* Cancel edit button */}
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
                    <td className="py-3 px-3">{user.name}</td>
                    <td className="py-3 px-3 hidden sm:table-cell">
                      {user.email}
                    </td>
                    <td className="py-3 px-3">{user.role}</td>
                    <td className="py-3 px-3 space-x-3">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-800"
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

      {/* Full Table Section with filter */}
      <section className="bg-white rounded-xl shadow-md p-6 border border-black mt-10 overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">
          All Accounts
        </h2>
        <input
          type="text"
          placeholder="Filter users by name, email or role"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-4 w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={loading}
        />
        <table className="w-full min-w-[650px] border-collapse text-gray-800">
          <thead>
            <tr className="border-b border-gray-400 bg-gray-100">
              <th className="py-3 px-3 text-left text-sm sm:text-base">Name</th>
              <th className="py-3 px-3 text-left text-sm sm:text-base hidden sm:table-cell">
                Email
              </th>
              <th className="py-3 px-3 text-left text-sm sm:text-base">Role</th>
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
                  {loading ? "Loading users..." : "No users found."}
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-3">{user.name}</td>
                  <td className="py-3 px-3 hidden sm:table-cell">
                    {user.email}
                  </td>
                  <td className="py-3 px-3">{user.role}</td>
                  <td className="py-3 px-3 space-x-3">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-800"
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

      {/* Delete confirmation modal */}
      {deleteWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg text-center">
            <p className="mb-6">{deleteWarning}</p>
            <div className="flex justify-center space-x-6">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HeaderSection() {
  return (
    <header className="text-center">
      <h1 className="text-3xl font-bold text-gray-900">Accounts Manager</h1>
      <p className="text-gray-600 mt-2">
        Manage user accounts with create, edit, and delete functions.
      </p>
    </header>
  );
}
