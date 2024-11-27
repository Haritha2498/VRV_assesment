import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserDetails = () => {
  const { name } = useParams(); // Retrieve username from the URL
  const [userDetails, setUserDetails] = useState(null); // State for user details
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [showEditPopup, setShowEditPopup] = useState(false); // State for Edit User popup
  const [showPermissionPopup, setShowPermissionPopup] = useState(false); // State for Add Permissions popup
  const [formData, setFormData] = useState({}); // State for form data
  const [permissions, setPermissions] = useState({
    read: false,
    write: false,
    delete: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details from an API
    const fetchUserDetails = async () => {
      try {
        const res = await fetch(`/api/userdetails/${name}`);
        const data = await res.json();
        console.log(data);
        setUserDetails(data);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [name]);

  const handleEditUser = () => {
    setFormData({
      username: name,
      userType: userDetails.userType,
      email: userDetails.email,
    });
    setShowEditPopup(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/edituser/${name}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("User details updated successfully!");
        setShowEditPopup(false);
         navigate("/admindashboard");
      }
    } catch (error) {
      console.error("Failed to update user details:", error);
    }
  };

  const handleAddPermissions = () => {
    setShowPermissionPopup(true);
  };

  const handlePermissionSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(permissions)
      const res = await fetch(`/api/addpermissions/${name}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({permissions}),
      });
      if (res.ok) {
        alert("Permissions added successfully!");
        setShowPermissionPopup(false);
      }
    } catch (error) {
      console.error("Failed to add permissions:", error);
    }
  };

  const handleDeleteUser = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (confirmed) {
      try {
        const res = await fetch(`/api/deleteuser/${name}`, { method: "DELETE" });
        if (res.ok) {
          alert(`Deleted user: ${name}`);
          navigate("/admindashboard");
        }
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPermissions({ ...permissions, [name]: checked });
  };

  if (loading) {
    return <div className="text-center mt-10">Loading user details...</div>;
  }

  if (!userDetails) {
    return <div className="text-center mt-10">User not found!</div>;
  }

  return (
    <div>
      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700
       mx-2 mt-8"
      >
        <a href="/admindashboard">Home</a>
      </button>
      <div className="flex justify-center items-center mt-10">
        <div className="w-1/2 bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">User Details</h1>
          <div className="border-t border-gray-200 py-4">
            <div className="flex justify-between py-2">
              <span className="font-semibold">Username:</span>
              <span>{name}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-semibold">User Type:</span>
              <span>{userDetails.userType}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-semibold">Email:</span>
              <span>{userDetails.email}</span>
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <button
              onClick={handleEditUser}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full mr-2"
            >
              Edit User
            </button>
            <button
              onClick={handleAddPermissions}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 w-full mx-2"
            >
              Add Permissions
            </button>
            <button
              onClick={handleDeleteUser}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 w-full ml-2"
            >
              Delete User
            </button>
          </div>
        </div>

        {/* Edit User Popup */}
        {showEditPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">Edit User</h2>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label className="block mb-1 font-semibold">Username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder={formData.username}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-semibold">User Type</label>
                  <input
                    type="text"
                    name="userType"
                    placeholder={formData.userType}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 font-semibold">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder={formData.password}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowEditPopup(false)}
                    className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Permissions Popup */}
        {showPermissionPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">Add Permissions</h2>
              <form onSubmit={handlePermissionSubmit}>
                <div className="mb-4">
                  <label className="block mb-2">
                    <input
                      type="checkbox"
                      name="read"
                      checked={permissions.read}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    Read
                  </label>
                  <label className="block mb-2">
                    <input
                      type="checkbox"
                      name="write"
                      checked={permissions.write}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    Write
                  </label>
                  <label className="block mb-2">
                    <input
                      type="checkbox"
                      name="delete"
                      checked={permissions.delete}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    Delete
                  </label>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowPermissionPopup(false)}
                    className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails
