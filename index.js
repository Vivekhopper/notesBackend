import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import mongooseCon from "./DbConnection/db.js";
import dotenv from "dotenv";
import noteRouter from "./routes/note.js";

dotenv.config();

const app = express();

// CORS Configuration
app.use(cors({
  origin: "https://notes-frontend-gamma.vercel.app", // Allow frontend URL
  credentials: true, // Allow cookies to be sent
}));

// Middleware
app.use(express.json());

// Handle preflight (OPTIONS) requests
app.options('*', cors());

// Connect to MongoDB
mongooseCon();

// Routes
app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);  // Make sure you are using the correct route for notes

// Start Server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
