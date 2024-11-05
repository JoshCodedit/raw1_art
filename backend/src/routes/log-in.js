import { getUserByEmail } from "../model/user.js";
import bcrypt from "bcryptjs"; // Ensure bcrypt version matches your implementation
import { createSession } from "../model/sessions.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.hashed_password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const sessionId = createSession(user.id);

    return res.json({ message: "Logged in successfully", sessionId });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
