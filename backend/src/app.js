import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // This is important for cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "16kbs" }));
app.use(express.static("public"));
app.use(cookieParser());

//import Routes
import userRouter from "./routes/user.route.js";
//Route Declaration
app.use("/api/v1/user", userRouter);

export { app };
