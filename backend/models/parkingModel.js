const mongoose = require('mongoose');

const parkingSpaceSchema = new mongoose.Schema({
  type: { type: String, required: true }, // '2Wheeler', '3Wheeler', or '4Wheeler'
  status: { type: [String], required: true }, // Array of 'Available' or 'Occupied'
});

const ParkingSpace = mongoose.model('ParkingSpace', parkingSpaceSchema);

module.exports = ParkingSpace;
