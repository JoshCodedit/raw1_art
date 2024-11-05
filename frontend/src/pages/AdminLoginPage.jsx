import React, { useState } from "react";
import AdminLoginComponent from "../components/AdminLogin";
import CreateLogin from "../components/CreateLogin";

const AdminLogin = () => {
  const [isCreateLoginVisible, setIsCreateLoginVisible] = useState(false);

  const handleNewUserClick = () => {
    setIsCreateLoginVisible(true);
  };

  const handleHaveAccountClick = () => {
    setIsCreateLoginVisible(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-red-600 mb-6">Admin Login</h2>
      {isCreateLoginVisible ? (
        <>
          <CreateLogin />
          <p className="mt-4 text-gray-700">
            Have an account?{" "}
            <span
              onClick={handleHaveAccountClick}
              className="text-blue-500 cursor-pointer underline hover:text-blue-700 transition duration-200"
            >
              Click here to login
            </span>
          </p>
        </>
      ) : (
        <>
          <p className="mt-4 text-gray-700">Welcome Back. Please login:</p>
          <AdminLoginComponent />
          <p className="mt-4 text-gray-700">
            New user?{" "}
            <span
              onClick={handleNewUserClick}
              className="text-blue-500 cursor-pointer underline hover:text-blue-700 transition duration-200"
            >
              Create Account
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default AdminLogin;
