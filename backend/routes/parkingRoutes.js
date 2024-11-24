const express = require('express');
const { createSlot, getAllSlots, updateSlot, deleteSlot } = require('../controllers/parkingController');

const router = express.Router();

// CRUD routes for parking slots
router.post('/slots', createSlot);
router.get('/slots', getAllSlots);
router.put('/slots/:id', updateSlot);
router.delete('/slots/:id', deleteSlot);

module.exports = router;
