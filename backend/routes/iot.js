import express from "express";
const router = express.Router();

let latestData = {
  ph: 0,
  temperature: 0,
  turbidity: 0,
  oxygen: 0,
};

router.post("/data", (req, res) => {
  latestData = req.body;
  res.json({ message: "Data received", data: latestData });
});

router.get("/data", (req, res) => {
  res.json(latestData);
});

export default router;
