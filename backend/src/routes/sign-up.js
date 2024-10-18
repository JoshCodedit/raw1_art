// src/routes/sign-up.js
import { createUser } from "../model/user.js";
import { createSession } from "../model/sessions.js";
import bcrypt from "bcryptjs"; // Changed require to import
import { Router } from "express"; // Ensure express Router is imported

const router = Router(); // Create a new router instance

function get(req, res) {
  const title = "Create an account";
  const content = ""; // This will be added once backend is finished
  const body = Layout({ title, content });
  res.send(body);
}

async function post(req, res) {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).send("Bad input");
  }

  try {
    // Hash the password
    const hash = await bcrypt.hash(password, 12);

    // Create the user in the database
    const user = await createUser(email, hash);

    // Create a session for the user
    const session_id = await createSession(user.id);

    // Set the session ID in a cookie
    res.cookie("sid", session_id, {
      signed: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      sameSite: "lax",
      httpOnly: true,
    });

    return res.send("Logged in"); // Successful response
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send("Internal Server Error"); // Handle potential server errors
  }
}

// Export the router instance with the associated routes
router.get("/sign-up", get);
router.post("/sign-up", post);
export default router;
