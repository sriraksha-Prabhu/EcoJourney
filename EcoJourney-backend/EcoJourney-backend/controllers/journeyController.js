
const EMISSION_FACTORS_KG_PER_KM = {
  Car: 0.271,
  Bus: 0.105,
  Bike: 0.021,
  Train: 0.041,
  Flight: 0.255,
  Walk: 0.0
};

import Journey from "../models/Journey.js";

export const addJourney = async (req, res) => {
  try {
    const { mode, distanceKm, note } = req.body;
    if (distanceKm == null || isNaN(distanceKm) || distanceKm < 0) {
      return res.status(400).json({ message: "distanceKm must be a non-negative number" });
    }
    if (!mode || !EMISSION_FACTORS_KG_PER_KM.hasOwnProperty(mode)) {
      return res.status(400).json({ message: "Invalid or missing travel mode" });
    }

    const factorKgPerKm = EMISSION_FACTORS_KG_PER_KM[mode];
    const emissionsG = Math.round(distanceKm * factorKgPerKm * 1000);

    const journey = await Journey.create({
      user: req.user._id,
      mode,
      distanceKm,
      emissionsG,
      note: note || ""
    });

    res.status(201).json(journey);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getJourneys = async (req, res) => {
  try {
    const journeys = await Journey.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(journeys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSummary = async (req, res) => {
  try {
    const pipeline = [
      { $match: { user: req.user._id } },
      { $group: { _id: "$mode", totalDistanceKm: { $sum: "$distanceKm" }, totalEmissionsG: { $sum: "$emissionsG" } } }
    ];
    const byMode = await Journey.aggregate(pipeline);
    const totals = await Journey.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: null, distanceKm: { $sum: "$distanceKm" }, emissionsG: { $sum: "$emissionsG" } } }
    ]);
    const total = totals[0] || { distanceKm: 0, emissionsG: 0 };
    res.json({ byMode, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
