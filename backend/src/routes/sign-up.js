import { createUser } from "../model/user";
import { createSession } from "../model/sessions";
const bcrypt = require("bcryptjs");

function get(req, res) {
  const title = "Create an account";
  const content = ""; //this will be added once backend is finished;
  const body = Layout({ title, content });
  res.send(body);
}

function post(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Bad input");
  } else {
    bcrypt.hash(password, 12).then((hash) => {
      const user = createUser(email, hash);
      const session_id = createSession(user.id);
      res.cookie("sid", session_id, {
        signed: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        sameSite: "lax",
        httpOnly: true,
      });
      res.redirect(`/confessions/${user.id}`);
    });
  }
}

module.exports = { get, post };
