import React from "react";

function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-500 text-white rounded">
          Total Users: 150
        </div>
        <div className="p-4 bg-green-500 text-white rounded">
          Active Users: 120
        </div>
        <div className="p-4 bg-yellow-500 text-white rounded">
          Total Roles: 5
        </div>
        <div className="p-4 bg-red-500 text-white rounded">
          Recent Activities: 50
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
