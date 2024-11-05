import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import { signup } from "./src/routes/sign-up.js";
import { login } from "./src/routes/log-in.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use((req, res, next) => {
  const time = new Date().toLocaleTimeString("en-GB");
  console.log(`${time} ${req.method} ${req.url}`);
  next();
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/sign-up", signup);
app.post("/log-in", login);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
