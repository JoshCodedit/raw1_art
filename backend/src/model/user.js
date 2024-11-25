// src/model/user.js
import db from "../../database/db.js"; // Ensure you add `.js` extension if using ES modules
import bcrypt from "bcrypt"; // Import bcrypt for password hashing

const createUser = async (email, password) => {

  const hashedPassword = await bcrypt.hash(password, 10);
  const query = "INSERT INTO users (email, hashed_password) VALUES (?, ?)";

  try {
    const stmt = db.prepare(query);
    console.log("Statement prepared"); // Debug log

    const body = stmt.run(email, hashedPassword);


    const verifyStmt = db.prepare("SELECT * FROM users WHERE id = ?");
    const inserted = verifyStmt.get(body.lastInsertRowid);
    console.log("Verified inserted user:", inserted);

    return body.lastInsertRowid;
  } catch (err) {
    console.error("Error creating user:", err);
    console.error("Error details:", err.message); // More error details
    throw err;
  }
};

const getUserByEmail = (email) => {
  console.log("Attempting to retrieve user by email:", email); // Debug log

  const query = "SELECT id, email, hashed_password FROM users WHERE email = ?";
  try {
    console.log("Preparing SQL statement..."); // Debug log
    const stmt = db.prepare(query);

    console.log("Executing SQL statement with email:", email); // Debug log
    const row = stmt.get(email); // Synchronously retrieves the user by email

    if (row) {
      console.log("User found:", row); // Debug log if user is found
    } else {
      console.log("No user found with email:", email); // Debug log if no user is found
    }

    return row; // Returns the user object if found, or `undefined` if not
  } catch (err) {
    console.error("Error retrieving user by email:", err);
    console.error("Error details:", err.message); // Detailed error message
    throw err; // Re-throw the error for handling in higher-level functions
  }
};

export { createUser, getUserByEmail };
