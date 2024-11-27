import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <nav>
        <ul>
          <li className="mb-2">
            <Link to="/" className="hover:bg-gray-700 p-2 rounded block">
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/users" className="hover:bg-gray-700 p-2 rounded block">
              Manage Users
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/roles" className="hover:bg-gray-700 p-2 rounded block">
              Manage Roles
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/permissions"
              className="hover:bg-gray-700 p-2 rounded block"
            >
              Manage Permissions
            </Link>
          </li>
          <li>
            <Link to="/logs" className="hover:bg-gray-700 p-2 rounded block">
              Activity Logs
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
