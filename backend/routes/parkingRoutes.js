const express = require('express');
const {
  getParkingSpaces,
  updateParkingSpace,
  seedParkingSpaces,
} = require('../controllers/parkingController');

const router = express.Router();

// Routes
router.get('/get', getParkingSpaces); // GET all parking spaces
router.post('/update', updateParkingSpace); // POST update status
router.post('/seed', seedParkingSpaces); // POST seed data

module.exports = router;
