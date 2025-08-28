import mongoose from 'mongoose';
import Student from '../models/student.js';
import Group from '../models/Group.js';

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

export async function updateStudent(req, res) {
  try {
    const { id } = req.params;
    const { name, phone, group, feePlan, startDate } = req.body;

    // Validate student ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid student ID' });
    }

    // Check if student exists
    const existingStudent = await Student.findById(id);
    if (!existingStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // If group is being updated, validate the new group
    if (group) {
      if (!mongoose.isValidObjectId(group)) {
        return res.status(400).json({ message: 'Invalid group ID' });
      }

      // Check if the new group exists
      const groupExists = await Group.findById(group);
      if (!groupExists) {
        return res.status(404).json({ message: 'Group not found' });
      }
    }

    // Update the student with new data
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        name,
        phone,
        group,
        feePlan,
        startDate
      },
      { new: true, runValidators: true }
    ).populate('group');

    return res.json(updatedStudent);
  } catch (err) {
    console.error('Error updating student:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

export async function deleteStudent(req, res) {
  try {
    const { id } = req.params;

    // Validate student ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid student ID' });
    }

    // Check if student exists and delete
    const deletedStudent = await Student.findByIdAndDelete(id);
    
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.json({ message: 'Student deleted successfully', student: deletedStudent });
  } catch (err) {
    console.error('Error deleting student:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}
