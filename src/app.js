import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/auth.route.js";

const app = express();

app.use(cookieParser());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Auth Routes
app.use("/api/auth", router);

export default app;
