import express from "express";
import { 
  createFeePlan, 
  getFeePlans, 
  updateFeePlan, 
  deleteFeePlan 
} from "../controllers/feePlanController.js";

const router = express.Router();

router.post("/", createFeePlan);
router.get("/", getFeePlans);
router.put("/:id", updateFeePlan); // Add update route
router.patch("/:id", updateFeePlan); // Add PATCH method
router.delete("/:id", deleteFeePlan); // Add delete route

export default router;