const ParkingSlot = require('../models/parkingModel');

// Create a parking slot
const createSlot = async (req, res) => {
  try {
    const { slotNumber, size } = req.body;
    const slotExists = await ParkingSlot.findOne({ slotNumber });
    if (slotExists) return res.status(400).json({ message: 'Slot already exists' });

    const slot = await ParkingSlot.create({ slotNumber, size });
    res.status(201).json({ message: 'Parking slot created successfully', slot });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all parking slots
const getAllSlots = async (req, res) => {
  try {
    const slots = await ParkingSlot.find();
    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a parking slot
const updateSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reservedBy } = req.body;

    const slot = await ParkingSlot.findByIdAndUpdate(
      id,
      { status, reservedBy },
      { new: true }
    );

    if (!slot) return res.status(404).json({ message: 'Slot not found' });

    res.status(200).json({ message: 'Slot updated successfully', slot });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a parking slot
const deleteSlot = async (req, res) => {
  try {
    const { id } = req.params;

    const slot = await ParkingSlot.findByIdAndDelete(id);
    if (!slot) return res.status(404).json({ message: 'Slot not found' });

    res.status(200).json({ message: 'Slot deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createSlot, getAllSlots, updateSlot, deleteSlot };
