// src/model/sessions.js
import db from "../../database/db.js"; // Ensure you're using the correct import statement
import crypto from "node:crypto";

// Function to create a new session
export function createSession(user_id) {
  const id = crypto.randomBytes(18).toString("base64");

  // Insert the session into the sessions table
  const query = `
    INSERT INTO sessions (id, user_id, expires_at) 
    VALUES (?, ?, ?)`;

  try {
    const stmt = db.prepare(query);
    stmt.run(
      id,
      user_id,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // Set expiration date to 7 days from now
    );
    return id; // Return the session ID
  } catch (error) {
    console.error("Error creating session:", error);
    throw error; // Handle the error as needed
  }
}

// Function to retrieve a session by ID
export function getSession(sid) {
  const query = `
    SELECT id, user_id, expires_at 
    FROM sessions 
    WHERE id = ?`;

  try {
    const stmt = db.prepare(query);
    const session = stmt.get(sid); // Synchronously retrieve the session by ID
    return session || null; // Return the retrieved session data or null if not found
  } catch (error) {
    console.error("Error retrieving session:", error);
    throw error; // Handle the error as needed
  }
}

// Function to remove a session by ID
export function removeSession(sid) {
  const query = `
    DELETE FROM sessions 
    WHERE id = ?`;

  try {
    const stmt = db.prepare(query);
    const result = stmt.run(sid); // Synchronously delete the session
    return result.changes > 0; // Return true if a session was deleted, false otherwise
  } catch (error) {
    console.error("Error removing session:", error);
    throw error; // Handle the error as needed
  }
}
