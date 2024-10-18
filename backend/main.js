import express from "express"; // Default import
const { Request, Response } = express; // Destructure named exports
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import signup from "./src/routes/sign-up.js";
import login from "./src/routes/log-in.js";

const app = express();
const port = process.env.PORT || 3001;

app.use((req, res, next) => {
  const time = new Date().toLocaleTimeString("en-GB");
  console.log(`${time} ${req.method} ${req.url}`);
  next();
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/sign-up", signup.get);
app.post("/sign-up", signup.post);
app.get("/log-in", login.get);
app.post("/log-in", login.post);
// app.post("/log-out", logout.post);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
