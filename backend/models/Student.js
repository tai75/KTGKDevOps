const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    studentCode: { type: String, required: true, trim: true },
    className: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
