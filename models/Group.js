import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  fee: { type: Number, required: true },
  frequency: { type: String, enum: ['Monthly', 'One-Time'], default: 'Monthly' },
  students: { type: Number, default: 0 },
  collected: { type: Number, default: 0 },
  dues: { type: Number, default: 0 },
  lastPaymentDate: { type: Date },
  nextDueDate: { type: Date },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

export default mongoose.model('Group', groupSchema);
