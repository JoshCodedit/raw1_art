import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";
import dotenv from "dotenv"; // Add this

// Load environment variables
dotenv.config(); // Add this

// Add error checking
if (!process.env.DB_FILE) {
  throw new Error("DB_FILE environment variable is not set");
}

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log("Database file path:", process.env.DB_FILE);

const db = new Database(process.env.DB_FILE);

// Add this to verify database is working
const test = db.prepare("SELECT 1").get();
console.log("Database connection test:", test);

const schemaPath = join(__dirname, "../database/schema.sql");
const schema = readFileSync(schemaPath, "utf-8");
console.log("Applying schema from:", schemaPath);
db.exec(schema);

export default db;
