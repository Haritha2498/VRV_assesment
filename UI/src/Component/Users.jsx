import React from "react";

function Users() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <button className="bg-blue-500 text-white px-4 py-2 mb-4 rounded">
        Add New User
      </button>
      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2">John Doe</td>
            <td className="p-2">john@example.com</td>
            <td className="p-2">User</td>
            <td className="p-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                Edit
              </button>
              <button className="bg-red-500 text-white px-2 py-1 ml-2 rounded">
                Delete
              </button>
            </td>
          </tr>
          {/* Add more rows dynamically */}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
