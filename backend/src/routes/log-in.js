import { getUserByEmail } from "../model/user.js";
import { createSession } from "../model/sessions.js";
import bcrypt from "bcryptjs";

function get(req, res) {
  const title = "Login";
  const content = ""; // This will be added once the backend is finished
  const body = Layout({ title, content });
  res.send(body);
}

async function post(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Bad input");
  }

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send("Invalid email or password");
    }

    const session_id = await createSession(user.id);

    res.cookie("sid", session_id, {
      signed: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "lax",
      httpOnly: true,
    });

    return res.send("Logged in");
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send("Internal Server Error"); // Handle potential server errors
  }
}

export default { get, post };
