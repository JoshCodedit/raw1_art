import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import AdminLoginComponent from "../components/AdminLogin";
import CreateLogin from "../components/CreateLogin";

const AdminLogin = () => {
  const [isCreateLoginVisible, setIsCreateLoginVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");

    if (sessionId) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleNewUserClick = () => {
    setIsCreateLoginVisible(true);
  };

  const handleHaveAccountClick = () => {
    setIsCreateLoginVisible(false);
  };

  if (isLoggedIn) {
    return <Navigate to="/UserDash" replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {isCreateLoginVisible ? (
        <>
          <h2 className="text-2xl font-bold text-main-purple mb-6">
            Create An Account
          </h2>
          <CreateLogin />
          <p className="mt-4 text-gray-700">
            Already have an account?{" "}
            <span
              onClick={handleHaveAccountClick}
              className="text-main-purple cursor-pointer underline hover:text-blue-700 transition duration-200"
            >
              Click here to login
            </span>
          </p>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-main-purple mb-6">
            Welcome Back. Please Login
          </h2>
          <AdminLoginComponent />
          <p className="mt-4 text-gray-700">
            New user?{" "}
            <span
              onClick={handleNewUserClick}
              className="text-main-purple cursor-pointer underline hover:text-blue-700 transition duration-200"
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
