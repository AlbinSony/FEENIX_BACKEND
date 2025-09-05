import PaymentRequest from "../models/PaymentRequest.js";
import Student from "../models/student.js";
import Group from "../models/Group.js";
import FeePlan from "../models/FeePlan.js";

// Create payment request
export const createPaymentRequest = async (req, res) => {
  try {
    const { student, feePlan, dueDate } = req.body;
    
    // Get student data
    const studentData = await Student.findById(student).populate('group');
    if (!studentData) {
      return res.status(404).json({ error: 'Student not found' });
    }

    let requestData = {
      student,
      dueDate,
      status: 'Pending'
    };

    // If feePlan is provided, use the fee plan
    if (feePlan) {
      const feePlanData = await FeePlan.findById(feePlan);
      if (!feePlanData) {
        return res.status(404).json({ error: 'Fee plan not found' });
      }
      requestData.feePlan = feePlan;
      requestData.amount = feePlanData.amount;
    } else {
      // Use group default fee
      if (!studentData.group) {
        return res.status(400).json({ error: 'Student has no group and no fee plan specified' });
      }
      requestData.group = studentData.group._id;
      requestData.amount = studentData.group.fee;
    }

    const request = new PaymentRequest(requestData);
    await request.save();
    
    // Populate the request before sending response
    const populatedRequest = await PaymentRequest.findById(request._id)
      .populate({
        path: 'student',
        populate: {
          path: 'group'
        }
      })
      .populate('feePlan')
      .populate('group');
    
    res.status(201).json(populatedRequest);
  } catch (err) {
    console.error('Error creating payment request:', err);
    res.status(400).json({ error: err.message });
  }
};

// Get all payment requests
export const getPaymentRequests = async (req, res) => {
  try {
    const requests = await PaymentRequest.find()
      .populate({
        path: 'student',
        populate: {
          path: 'group'
        }
      })
      .populate('feePlan')
      .populate('group');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    
    if (updateData.status === 'Paid' && !updateData.paidAt) {
      updateData.paidAt = new Date();
    }
    
    const updated = await PaymentRequest.findByIdAndUpdate(id, updateData, { new: true })
      .populate({
        path: 'student',
        populate: {
          path: 'group'
        }
      })
      .populate('feePlan')
      .populate('group');
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Add delete endpoint
export const deletePaymentRequest = async (req, res) => {
  try {
    const { id } = req.params;
    await PaymentRequest.findByIdAndDelete(id);
    res.status(200).json({ message: 'Payment request deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};