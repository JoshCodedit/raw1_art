import Database from "better-sqlite3";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Ensure the DB_FILE environment variable is set
if (!process.env.DB_FILE) {
  throw new Error("DB_FILE environment variable is not set");
}

// Connect to the database
const db = new Database(process.env.DB_FILE);

try {
  // Clear all session data
  db.prepare("DELETE FROM sessions").run();
  console.log("All session data cleared.");

  // Optionally, clear all user data (uncomment if needed)
  // db.prepare("DELETE FROM users").run();
  // console.log("All user data cleared.");
} catch (error) {
  console.error("Error clearing database data:", error);
} finally {
  db.close();
}
