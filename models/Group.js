import mongoose from 'mongoose';
import { PAYMENT_PLAN_VALUES, STATUS_VALUES, PAYMENT_PLANS } from '../constants/index.js';

const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: String,
    fee: { type: Number, required: true },
    frequency: {
      type: String,
      enum: PAYMENT_PLAN_VALUES,
      default: PAYMENT_PLANS.MONTHLY
    },
    students: { type: Number, default: 0 },
    collected: { type: Number, default: 0 },
    dues: { type: Number, default: 0 },
    lastPaymentDate: { type: Date },
    nextDueDate: { type: Date },
    status: { type: String, enum: STATUS_VALUES, default: 'active' }
  },
  { timestamps: true }
);

export default mongoose.model('Group', groupSchema);
