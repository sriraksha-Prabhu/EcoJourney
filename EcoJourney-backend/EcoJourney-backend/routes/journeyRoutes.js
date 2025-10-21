
import express from "express";
import { addJourney, getJourneys, getSummary } from "../controllers/journeyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addJourney);
router.get("/", protect, getJourneys);
router.get("/summary", protect, getSummary);

export default router;
