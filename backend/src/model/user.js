// src/model/user.js
import db from "../../database/db.js"; // Ensure you add `.js` extension if using ES modules
import bcrypt from "bcrypt"; // Import bcrypt for password hashing

const createUser = async (email, password) => {
  console.log("Attempting to create user with email:", email); // Debug log

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Password hashed successfully"); // Debug log

  const query = "INSERT INTO users (email, hashed_password) VALUES (?, ?)";

  try {
    const stmt = db.prepare(query);
    console.log("Statement prepared"); // Debug log

    const body = stmt.run(email, hashedPassword);
    console.log("Insert operation completed with result:", body); // Debug log
    console.log("User created successfully with ID:", body.lastInsertRowid);

    // Verify the insert worked
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
  const query = "SELECT id, email FROM users WHERE email = ?"; // Exclude hashed_password for security

  try {
    const stmt = db.prepare(query);
    const row = stmt.get(email); // Synchronously retrieves the user by email
    return row; // Returns the user object if found
  } catch (err) {
    console.error("Error retrieving user by email:", err);
    throw err;
  }
};

export { createUser, getUserByEmail };
