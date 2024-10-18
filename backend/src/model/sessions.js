// src/model/sessions.js
import db from "../database/db.js"; // Ensure you're using the correct import statement
import crypto from "node:crypto";

// Function to create a new session
export async function createSession(user_id) {
  const id = crypto.randomBytes(18).toString("base64");

  // Insert the session into the sessions table
  const { data, error } = await db
    .from("sessions") // Specify the table name
    .insert([
      {
        id,
        user_id,
        expires_at: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toISOString(),
      },
    ]); // Set expiration date to 7 days from now

  if (error) {
    console.error("Error creating session:", error);
    throw error; // Handle the error as needed
  }

  return id; // Return the session ID
}

// Function to retrieve a session by ID
export async function getSession(sid) {
  const { data, error } = await db
    .from("sessions")
    .select("id, user_id, expires_at") // Specify the fields to select
    .eq("id", sid) // Filter by session ID
    .single(); // Use single() if you expect only one result

  if (error) {
    console.error("Error retrieving session:", error);
    throw error; // Handle the error as needed
  }

  return data; // Return the retrieved session data
}

// Function to remove a session by ID
export async function removeSession(sid) {
  const { data, error } = await db.from("sessions").delete().eq("id", sid); // Specify which session to delete

  if (error) {
    console.error("Error removing session:", error);
    throw error; // Handle the error as needed
  }

  return data; // Return any relevant data from the deletion, if needed
}
