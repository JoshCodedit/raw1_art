import React, { useState } from "react";

const AdminLoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [fail, setFail] = useState("");

  const userLogin = async (email, password) => {
    return fetch("http://localhost:3001/log-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await userLogin(email, password);
    if (response.ok) {
      const data = await response.json();
      // Store the session ID in localStorage
      localStorage.setItem("sessionId", data.sessionId); // Adjust this line based on your API response
      setSuccess("Login successful!");
      // Optionally redirect to the dashboard
    } else {
      setFail("Login failed, please try again.");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email" // Placeholder for email input
            className="bg-gray-100 h-14 px-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-main-purple w-full"
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password" // Placeholder for password input
            className="bg-gray-100 h-14 px-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-main-purple w-full"
          />
        </div>

        {success && <p className="text-green-500 text-sm">{success}</p>}
        {fail && <p className="text-red-500 text-sm">{fail}</p>}

        <button
          className="bg-main-purple w-full h-14 text-white rounded"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLoginComponent;
