import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import methodOverride from 'method-override';
import { MONGO_URI, PORT } from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import feePlanRoutes from "./routes/feePlanRoutes.js";
import paymentRequestRoutes from "./routes/paymentRequestRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/students', studentRoutes);
app.use("/api/fee-plans", feePlanRoutes);
app.use("/api/payment-requests", paymentRequestRoutes);

// MongoDB Connection and server start
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Mongo connection error:', err);
    process.exit(1);
  });
