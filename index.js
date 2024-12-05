import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import mongooseCon from "./DbConnection/db.js";
import dotenv from "dotenv";
import noteRouter from "./routes/note.js"
dotenv.config();

const app = express();

app.use(cors({
  origin:"https://notes-frontend-gamma.vercel.app",
  credentials:true
}));
app.use(express.json());

mongooseCon();
app.use("/api/auth", authRouter);
app.use("/api/auth", noteRouter);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
