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
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <input
            type="email"
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

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-500 text-sm">{successMessage}</p>
        )}

        <button
          className="bg-main-purple w-full h-14 text-white rounded"
          type="submit"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateLogin;
