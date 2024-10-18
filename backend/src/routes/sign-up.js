import { createUser } from "../model/user";
import { createSession } from "../model/sessions";
const bcrypt = require("bcryptjs");

function get(req, res) {
  const title = "Create an account";
  const content = ""; // This will be added once backend is finished;
  const body = Layout({ title, content });
  res.send(body);
}

async function post(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Bad input");
  }

  try {
    const hash = await bcrypt.hash(password, 12);

    const user = await createUser(email, hash);
    const session_id = await createSession(user.id);

    res.cookie("sid", session_id, {
      signed: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "lax",
      httpOnly: true,
    });

    return res.redirect(`/confessions/${user.id}`);
  } catch (error) {
    console.error("Error during user creation:", error);
    return res.status(500).send("Internal server error");
  }
}

module.exports = { get, post };
