import mongoose from 'mongoose';
import Student from '../models/student.js';
import Group from '../models/group.js';

export async function createStudent (req, res) {
  try {
    const { name, phone, group, feePlan, startDate } = req.body;

    if (!mongoose.isValidObjectId(group)) {
      return res.status(400).json({ message: 'Invalid group id' });
    }

    // Check if group exists
    const groupExists = await Group.findById(group);
    if (!groupExists) {
      return res.status(404).json({ message: 'Group not found' });
    }

    const student = new Student({
      name,
      phone,
      group,
      feePlan,
      startDate
    });

    await student.save();
    return res.status(201).json(student);
  } catch (err) {
    console.error('Error creating student:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

export async function getStudents (req, res) {
  try {
    const students = await Student.find().populate('group');
    return res.json(students);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}
