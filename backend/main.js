import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import { signup } from "./src/routes/sign-up.js";
import { login } from "./src/routes/log-in.js";
import { addProduct } from "./src/routes/addProduct.js";
import dotenv from "dotenv"; // Add this

dotenv.config(); // Add this

const app = express();
const port = process.env.PORT || 3001;

console.log("Environment Variables:");
console.log("AWS_REGION:", process.env.AWS_REGION);
console.log("AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID);
console.log("AWS_SECRET_ACCESS_KEY:", process.env.AWS_SECRET_ACCESS_KEY);
console.log("AWS_BUCKET_NAME:", process.env.AWS_BUCKET_NAME);


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
app.post("/products", addProduct);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
