import db from "../database/db.js"; // Correct import statement

// Function to create a new user
export async function createUser(email, hash) {
  const { data, error } = await db
    .from("users") // Specify the table name
    .insert([{ email, hash }]) // Insert an array of objects
    .select("id") // Specify the columns you want to return
    .single(); // Use .single() if you expect a single record

  if (error) {
    console.error("Error creating user:", error);
    throw error; // Handle the error as needed
  }

  return data.id; // Return the ID of the newly created user
}

// Function to retrieve a user by email
export async function getUserByEmail(email) {
  const { data, error } = await db
    .from("users")
    .select("id, email, hash, created_at") // Specify the fields to select
    .eq("email", email) // Filter by email
    .single(); // Use .single() if you expect a single record

  if (error) {
    console.error("Error retrieving user by email:", error);
    throw error; // Handle the error as needed
  }

  return data; // Return the retrieved user data
}
