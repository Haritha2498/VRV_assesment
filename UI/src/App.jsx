import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import LoginPage from './pages/LogniPage';
import AuthLayout from './Layout/AuthLayout';
import UserDashboard from './pages/Userdashboard';
import SignupPage from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import Userdetails from './pages/Userdetails';
import Permissions from './pages/Permissions';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/userdetails/:name" element={<Userdetails />} />
          <Route path="/permissions" element={<Permissions />} />
        </Route>
      </>
    )
  );
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}
    
   
export default App
