const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Student = require("./models/Student");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;
const APP_NAME = process.env.APP_NAME || "KTGKDevOps";

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/students", async (_req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch students", error: error.message });
  }
});

app.post("/api/students", async (req, res) => {
  try {
    const { fullName, studentCode, className } = req.body;

    if (!fullName || !studentCode || !className) {
      return res.status(400).json({ message: "fullName, studentCode, className are required" });
    }

    const created = await Student.create({ fullName, studentCode, className });
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create student", error: error.message });
  }
});

app.put("/api/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, studentCode, className } = req.body;

    const updated = await Student.findByIdAndUpdate(
      id,
      { fullName, studentCode, className },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update student", error: error.message });
  }
});

app.get("/", (_req, res) => {
  res.json({
    app: APP_NAME,
    message: "Backend is running"
  });
});

async function start() {
  if (!DB_URL) {
    console.error("Missing DB_URL in environment variables");
    process.exit(1);
  }

  try {
    await mongoose.connect(DB_URL);
    console.log(`Connected to database: ${DB_URL}`);
    app.listen(PORT, () => {
      console.log(`${APP_NAME} backend listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to database", error.message);
    process.exit(1);
  }
}

start();
