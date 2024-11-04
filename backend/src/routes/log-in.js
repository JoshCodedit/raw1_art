import { getUserByEmail } from "../model/user.js";
import bcrypt from "bcryptjs"; // Ensure bcrypt version matches your implementation

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).send("Invalid email or password.");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.hashed_password
    );

    if (!isPasswordValid) {
      return res.status(401).send("Invalid email or password.");
    }

    res.send("Logged in successfully");
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send("Internal Server Error");
  }
};
