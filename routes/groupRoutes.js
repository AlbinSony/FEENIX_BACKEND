const express = require('express');
const { createGroup, getGroups, getGroupById,updateGroup,deleteGroup } = require('../controllers/groupController');

const router = express.Router();

router.post('/', createGroup);
router.get('/', getGroups);
router.get('/:id', getGroupById);
router.patch('/:id', updateGroup); 
router.delete('/:id', deleteGroup); 

module.exports = router;
