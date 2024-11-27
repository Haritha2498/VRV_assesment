import React, { useState, useEffect } from "react";

const Permissions = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all users and their permissions
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/getuserspermissions"); // Replace with your API endpoint
        const data = await res.json();
        console.log(data)
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading users...</div>;
  }

  if (users.length === 0) {
    return <div className="text-center mt-10">No users found with permissions!</div>;
  }

  return (
    <div className=" bg-gray-100">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700
       mx-2 mt-8"
      >
        <a href="/admindashboard">Home</a>
      </button>
      <div className="p-10 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">
          User Permissions
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.username}
              className="bg-white shadow-md rounded-lg p-6 border"
            >
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                username:{user.username}
              </h2>
              {/* <p className="text-gray-600 mb-4">
              <strong>User Type:</strong> {user.userType || "Not specified"}
            </p> */}
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  Permissions:
                </h3>
                <ul className="list-disc list-inside">
                  {user.permissions.map((permission, index) => (
                    <li key={index} className="text-blue-600 font-medium">
                      {permission.charAt(0).toUpperCase() + permission.slice(1)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Permissions;
