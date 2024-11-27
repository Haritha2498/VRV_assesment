import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate,Link } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [userType,setUserType] =useState("");
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    const loginDetails = {
      userName,
      password,
    };

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    });

    if (res.ok) {
      const data = await res.json();
      setUserType(data.userType) 
      console.log(data.userType)
      const userType = data.userType;
      toast.success(`Logged in as: ${data.userType}`);

      if(userType === "admin"){
        return navigate("/admindashboard")
      }else{
      return navigate("/userdashboard");

      }
    } else {
      toast.error("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="bg-gray-200 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          User Login
        </h2>
        <form onSubmit={loginSubmit}>
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-gray-700 font-semibold mb-2"
            >
              UserName:
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
            >
              Login
            </button>
            {/* <a href="#" className="text-blue-500 hover:underline">
              Forgot Password?
            </a> */}
          </div>
          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-700 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

// 

export { LoginPage as default };
