// controllers/parkingController.js
const Parking = require('../models/parkingModel');

// Get all parking spaces
const getParkingSpaces = async (req, res) => {
  try {
    const parkingSpaces = await Parking.find();
    res.status(200).json(parkingSpaces);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a parking slot
const updateSlot = async (req, res) => {
  try {
    const { id, slotIndex, status } = req.body; // ID of the parking space, index of the slot, and new status

    const parkingSpace = await Parking.findById(id);
    if (!parkingSpace) return res.status(404).json({ message: 'Parking space not found' });

    parkingSpace.slots[slotIndex].status = status;
    await parkingSpace.save();

    res.status(200).json({ message: 'Slot updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getParkingSpaces, updateSlot };
