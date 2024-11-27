import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthLayout = () => {
  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default AuthLayout;
