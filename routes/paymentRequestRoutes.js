import express from "express";
import { 
  createPaymentRequest, 
  getPaymentRequests, 
  updatePaymentStatus,
  deletePaymentRequest 
} from "../controllers/paymentRequestController.js";

const router = express.Router();

router.post("/", createPaymentRequest);
router.get("/", getPaymentRequests);
router.put("/:id", updatePaymentStatus);
router.patch("/:id", updatePaymentStatus); // Add PATCH method
router.delete("/:id", deletePaymentRequest); // Add DELETE method

export default router;