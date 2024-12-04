import { createUser } from "../model/user.js"; 

export const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userId = await createUser(email, password); 
    res.status(201).json({ message: "User created successfully", userId });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
