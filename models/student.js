import mongoose from 'mongoose';
import { PAYMENT_PLAN_VALUES } from '../constants/index.js';

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    feePlan: {
      type: String,
      enum: PAYMENT_PLAN_VALUES,
      required: true
    },
    startDate: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('Student', studentSchema);
