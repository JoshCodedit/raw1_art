import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { signup } from "./src/routes/sign-up.js"; // Adjusted import for signup post method

const app = express();
const port = process.env.PORT || 3000;

// Middleware for logging
app.use((req, res, next) => {
  const time = new Date().toLocaleTimeString("en-GB");
  console.log(`${time} ${req.method} ${req.url}`);
  next();
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route definitions
app.post("/sign-up", signup); // Ensure this line is present and correct

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
