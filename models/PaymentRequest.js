import mongoose from "mongoose";

const paymentRequestSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  feePlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FeePlan",
    required: false, // Changed from true to false
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: false, // Add this field for group default payments
  },
  amount: {
    type: Number,
    required: true, // Add amount field
  },
  status: {
    type: String,
    enum: ["Pending", "Paid", "Overdue"],
    default: "Pending",
  },
  dueDate: {
    type: Date,
    required: true,
  },
  paidAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("PaymentRequest", paymentRequestSchema);