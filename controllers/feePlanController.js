import FeePlan from "../models/FeePlan.js";

// Create new fee plan
export const createFeePlan = async (req, res) => {
  try {
    const feePlan = new FeePlan(req.body);
    await feePlan.save();
    res.status(201).json(feePlan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all fee plans
export const getFeePlans = async (req, res) => {
  try {
    const plans = await FeePlan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update fee plan
export const updateFeePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await FeePlan.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Fee plan not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete fee plan
export const deleteFeePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await FeePlan.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Fee plan not found' });
    }
    res.status(200).json({ message: 'Fee plan deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};