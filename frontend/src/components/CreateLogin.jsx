import React, { useState } from "react";

const CreateLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation: check if fields are filled
    if (!username || !password) {
      setError("Please fill in both fields.");
      setSuccess("");
      return;
    }

    // Reset error if everything is filled
    setError("");

    // Mock "account creation" logic (replace this with API calls to your backend)
    console.log("Creating account with:", { username, password });

    // Simulate successful account creation
    setSuccess("Account created successfully!");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="register-form">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateLogin;
