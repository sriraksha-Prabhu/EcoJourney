
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import journeyRoutes from "./routes/journeyRoutes.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/journeys", journeyRoutes);

app.get("/", (req, res) => {
  res.json({ status: "ok", app: "EcoJourney API" });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`EcoJourney API running on port ${PORT}`));
