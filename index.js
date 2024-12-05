import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import noteRouter from "./routes/note.js";
import mongooseCon from "./DbConnection/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// CORS Configuration
app.use(cors({
  origin: "https://notes-frontend-gamma.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


// Middleware
app.use(express.json());

// Connect to MongoDB
mongooseCon();

// Routes
app.use("/api/auth", authRouter); // Authentication routes
app.use("/api/notes", noteRouter); // Notes routes

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start Server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
