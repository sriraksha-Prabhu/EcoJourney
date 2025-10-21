
import mongoose from "mongoose";

const journeySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mode: { 
      type: String, 
      required: true, 
      enum: ["Car", "Bus", "Bike", "Train", "Flight", "Walk"]
    },
    distanceKm: { type: Number, required: true, min: 0 },
    emissionsG: { type: Number, required: true, min: 0 },
    note: { type: String }
  },
  { timestamps: true }
);

const Journey = mongoose.model("Journey", journeySchema);
export default Journey;
