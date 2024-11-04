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
    <>
      <h2>Admin Login</h2>
      {isCreateLoginVisible ? (
        <>
          <CreateLogin />
          <p>
            Have an account?{" "}
            <span
              onClick={handleHaveAccountClick}
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Click here to login
            </span>
          </p>
        </>
      ) : (
        <>
          <p>Welcome Back. Please login:</p>
          <AdminLoginComponent />
          <p>
            New user?{" "}
            <span
              onClick={handleNewUserClick}
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Create Account
            </span>
          </p>
        </>
      )}
    </>
  );
};

export default AdminLogin;
