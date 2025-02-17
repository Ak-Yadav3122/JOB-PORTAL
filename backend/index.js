//  when we use import statement then we have to use the file extension with them

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
import connectDB from "./Utils/DataBaseConnect.js";
import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.routes.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.routes.js";
//serve the frontend file on backend so we need the sept:1 path
import path from "path";

dotenv.config({});

// using the middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define your frontend url allowed origin
const allowedOrigins = ["https://job-portal-xi-six.vercel.app", // Your frontend
"http://localhost:5173", // Local frontend
];


// Use CORS middleware and configure it
app.use(cors({
  origin: allowedOrigins,  // Allow requests from these origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow these headers
  credentials: true,  // Allow credentials (cookies, headers)
}));

// Middleware to explicitly set CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://job-portal-xi-six.vercel.app"); // Allow all origins or specific one
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next(); // Pass the request to the next handler
});
//Creation of API'S

app.use("/api/a1/user", userRoute);
app.use("/api/a1/company", companyRoute);
app.use("/api/a1/job", jobRoute);
app.use("/api/a1/application", applicationRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  //listeen take twoo parameter one is port number and anothe is one call back function
  connectDB();
  console.log(`server is running at port: ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World, Backend is running");
});
