
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide name, email, and password" });
    }
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
    const token = signToken(user._id);
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const match = await user.matchPassword(password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user._id);
    res.json({ _id: user._id, name: user.name, email: user.email, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
