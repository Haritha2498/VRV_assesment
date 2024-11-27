import React from "react";

const UserDashboard = () => {
  // Mock data for user details
  const userData = {
    username: "USER!",
    role: "R&D",
    permissions: ["Read", "Write", "Delete"],
    status: "Active", // Active or Inactive
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          User Dashboard
        </h1>
        <div className="grid grid-cols-2 gap-6">
          {/* Username */}
          <div className="bg-blue-50 p-4 rounded-md shadow">
            <h2 className="text-lg font-semibold text-gray-700">Username:</h2>
            <p className="text-gray-900 text-lg mt-2">{userData.username}</p>
          </div>

          {/* Role */}
          <div className="bg-blue-50 p-4 rounded-md shadow">
            <h2 className="text-lg font-semibold text-gray-700">Role:</h2>
            <p className="text-gray-900 text-lg mt-2">{userData.role}</p>
          </div>

          {/* Permissions */}
          <div className="bg-blue-50 p-4 rounded-md shadow col-span-2">
            <h2 className="text-lg font-semibold text-gray-700">
              Permissions:
            </h2>
            <ul className="list-disc list-inside text-gray-900 mt-2">
              {userData.permissions.map((permission, index) => (
                <li key={index} className="text-lg">
                  {permission}
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div className="bg-blue-50 p-4 rounded-md shadow">
            <h2 className="text-lg font-semibold text-gray-700">Status:</h2>
            <p
              className={`text-lg mt-2 ${
                userData.status === "Active" ? "text-green-600" : "text-red-600"
              }`}
            >
              {userData.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
