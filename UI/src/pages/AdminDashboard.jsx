import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to toggle modal
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchUsers = async () => {
    // const mockUsers = [
    //   { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    //   { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    // ];

    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchRoles = async () => {
    const mockRoles = [
      { id: 1, name: "Admin", permissions: ["Manage Users", "Manage Roles"] },
      { id: 2, name: "User", permissions: ["View Content"] },
    ];
    setRoles(mockRoles);
  };

  const fetchPermissions = async () => {
    const mockPermissions = ["Manage Users", "Manage Roles", "View Content"];
    setPermissions(mockPermissions);
  };

  const addUserApi = async (userData) => {
    try {
      const res = await fetch("/api/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      console.log("msg", res);
      
      if (res.ok) {
        navigate("/admindashboard");
      }

    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    await addUserApi(newUser);
    setShowModal(false);
    setNewUser({ name: "", email: "", password: "", role: "" }); // Reset form
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleDeleteUser = (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white">
        <div className="p-4 text-lg font-bold">Admin Dashboard</div>
        <nav>
          <ul>
            <a href="/admindashboard">
              <li className="p-4 hover:bg-blue-700 cursor-pointer">
                Dashboard
              </li>
            </a>
            <a href="/admindashboard">
            <li className="p-4 hover:bg-blue-700 cursor-pointer">Users</li>
            </a>
            <a href="/admindashboard">
            <li className="p-4 hover:bg-blue-700 cursor-pointer">Roles</li>
            </a>
            <a href="/permissions">
            <li className="p-4 hover:bg-blue-700 cursor-pointer">
              Permissions
            </li>
            </a>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">Welcome, Admin!</h1>

        {/* Users Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold mb-2">Users</h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add User
            </button>
          </div>
          <table className="w-full bg-white shadow-md rounded overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-4">{user.username}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.userType}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      <Link to={`/userdetails/${user.username}`}>
                        Manage User
                      </Link>
                    </button>
                    {/* <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete */}
                    {/* </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Modal for Adding User */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Add User</h2>
              <form onSubmit={handleAddUser}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({ ...newUser, role: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded"
                    required
                  >
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-300 px-4 py-2 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
