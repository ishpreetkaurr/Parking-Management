const mongoose = require('mongoose');

const parkingSlotSchema = new mongoose.Schema({
  slotNumber: { type: Number, required: true, unique: true },
  status: { type: String, enum: ['available', 'occupied'], default: 'available' },
  size: { type: String, enum: ['small', 'medium', 'large'], default: 'medium' },
  reservedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
}, { timestamps: true });

module.exports = mongoose.model('ParkingSlot', parkingSlotSchema);
