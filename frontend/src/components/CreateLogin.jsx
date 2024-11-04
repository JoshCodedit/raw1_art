import React, { useState } from "react";

const CreateLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please fill in both fields.");
      setSuccessMessage("");
      return;
    }

    setErrorMessage("");

    try {
      const response = await createAccount(email, password);
      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message || "Account created successfully!");
        resetForm();
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "Error creating account. Please try again."
        );
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error during account creation:", error);
      setErrorMessage("Error creating account. Please try again.");
      setSuccessMessage("");
    }
  };

  const createAccount = async (email, password) => {
    return fetch("http://localhost:3001/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="register-form">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
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

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateLogin;
