import express from "express";
import db from "../database/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const secret = process.env.JWT_SECRET || "your_secret_key";
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

// Save water quality history
router.post("/save", verifyToken, (req, res) => {
  const { ph_level, turbidity, temperature, dissolved_oxygen, water_status } = req.body;

  if (ph_level == null || turbidity == null || temperature == null || dissolved_oxygen == null || water_status == null) {
    return res.status(400).json({ message: "Missing required data" });
  }

  const userId = req.user.id;

  const sql = `
    INSERT INTO history (user_id, ph_level, turbidity, temperature, dissolved_oxygen, water_status, recorded_at)
    VALUES (?, ?, ?, ?, ?, ?, NOW())
  `;

  db.query(sql, [userId, ph_level, turbidity, temperature, dissolved_oxygen, water_status], (err, result) => {
    if (err) {
      console.error("Save history error:", err);
      return res.status(500).json({ message: "Database error", error: err.message });
    }

    res.status(201).json({
      message: "History saved successfully",
      id: result.insertId,
    });
  });
});

// Fetch history based on user role
router.get("/", verifyToken, (req, res) => {
  // Check if user is an administrator (case-insensitive)
  const userRole = req.user.role ? req.user.role.toLowerCase() : "user";
  const isAdmin = userRole === "admin" || userRole === "administrator";

  console.log("User ID:", req.user.id, "Role:", req.user.role, "Is Admin:", isAdmin);

  let sql;
  let queryParams;

  if (isAdmin) {
    // Admins see all history with usernames
    sql = `
      SELECT h.id, h.user_id, h.ph_level, h.turbidity, h.temperature, h.dissolved_oxygen, h.water_status, h.recorded_at, u.username 
      FROM history h 
      LEFT JOIN users u ON h.user_id = u.id 
      ORDER BY h.recorded_at DESC
    `;
    queryParams = [];
  } else {
    // Regular users only see their own history
    sql = `
      SELECT * FROM history WHERE user_id = ? ORDER BY recorded_at DESC
    `;
    queryParams = [req.user.id];
  }

  db.query(sql, queryParams, (err, results) => {
    if (err) {
      console.error("Fetch history error:", err);
      return res.status(500).json({ message: "Database error", error: err.message });
    }

    console.log("Query results count:", results.length, "Is Admin:", isAdmin);
    if (isAdmin && results.length > 0) {
      console.log("Sample result (first record):", results[0]);
    }
    res.status(200).json(results);
  });
});

export default router;
