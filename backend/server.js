import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { fileURLToPath } from 'url';
import { GoogleGenAI } from "@google/genai";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";  
import iotRoutes from "./routes/iot.js";
import historyRoutes from "./routes/history.js";
import db from "./database/db.js";

dotenv.config();

// Initialize Gemini SDK with your secret key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files with absolute path
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root route (just to test if server runs)
app.get("/", (req, res) => {
  res.send("Project IOT API is running ✅");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);  
app.use("/api/iot", iotRoutes);
app.use("/api/history", historyRoutes);

// Gemini AI Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        // Use the highly efficient and fast gemini-3.5-flash model
        const response = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: prompt,
        });

        res.json({ text: response.text });
    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ error: "Something went wrong processing your request." });
    }
});

// Handle 404 (unknown routes)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
