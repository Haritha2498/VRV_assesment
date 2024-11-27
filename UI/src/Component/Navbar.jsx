import React from "react";

function Navbar() {
  return (
    <div className="bg-gray-100 p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Welcome, Admin</h1>
      <div>
        <button className="mr-4 text-blue-600">Notifications</button>
        <button className="text-red-600">Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
