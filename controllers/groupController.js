import Group from '../models/Group.js';

export async function createGroup (req, res) {
  try {
    const group = new Group(req.body);
    await group.save();
    return res.status(201).json(group);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export async function getGroups (req, res) {
  try {
    const groups = await Group.find();
    return res.status(200).json(groups);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function getGroupById (req, res) {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found' });
    return res.status(200).json(group);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function updateGroup (req, res) {
  try {
    const groupId = req.params.id;
    const updates = req.body;

    const updatedGroup = await Group.findByIdAndUpdate(groupId, updates, {
      new: true,
      runValidators: true
    });

    if (!updatedGroup) {
      return res.status(404).json({ message: 'Group not found' });
    }

    return res.json(updatedGroup);
  } catch (error) {
    console.error('Error updating group:', error);
    return res.status(500).json({ message: 'Server error while updating group' });
  }
}

export async function deleteGroup (req, res) {
  try {
    const groupId = req.params.id;

    const deletedGroup = await Group.findByIdAndDelete(groupId);

    if (!deletedGroup) {
      return res.status(404).json({ message: 'Group not found' });
    }

    return res.json({ message: 'Group deleted successfully' });
  } catch (error) {
    console.error('Error deleting group:', error);
    return res.status(500).json({ message: 'Server error while deleting group' });
  }
}
