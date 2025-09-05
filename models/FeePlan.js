import mongoose from "mongoose";

const feePlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  frequency: {
    type: String,
    enum: ["Weekly", "Monthly", "Quarterly", "Yearly", "One-time"], // Added "One-time"
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("FeePlan", feePlanSchema);