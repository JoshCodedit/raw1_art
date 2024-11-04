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
      setSuccess("Login successful!");
    } else {
      setFail("Login failed, please try again.");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {success && <p style={{ color: "green" }}>{success}</p>}
        {fail && <p style={{ color: "red" }}>{fail}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLoginComponent;
