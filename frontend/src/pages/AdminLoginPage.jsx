import React from "react";
import AdminLoginComponent from "../components/AdminLogin";
import CreateLogin from "../components/CreateLogin";

const AdminLogin = () => {
  return (
    <>
      <h2>Admin Login</h2>
      <p>Welcome Back. Please login:</p>
      <AdminLoginComponent />
      <p>New user ?</p>
      <CreateLogin />
    </>
  );
};

export default AdminLogin;
