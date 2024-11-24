const ParkingSpace = require('../models/parkingModel');

// Get all parking spaces
const getParkingSpaces = async (req, res) => {
  try {
    const spaces = await ParkingSpace.find();
    res.status(200).json(spaces);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch parking spaces' });
  }
};

// Update parking space status
const updateParkingSpace = async (req, res) => {
  try {
    const { type, index, status } = req.body;

    const space = await ParkingSpace.findOne({ type });
    if (space) {
      space.status[index] = status; // Update the status
      await space.save();
      res.status(200).json({ message: 'Status updated successfully' });
    } else {
      res.status(404).json({ error: 'Parking type not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update parking space' });
  }
};

// Seed initial parking data
const seedParkingSpaces = async (req, res) => {
  try {
    await ParkingSpace.deleteMany(); // Clear existing data
    await ParkingSpace.insertMany([
      { type: '2Wheeler', status: Array(7).fill('Available') },
      { type: '3Wheeler', status: Array(7).fill('Available') },
      { type: '4Wheeler', status: Array(7).fill('Available') },
    ]);
    res.status(201).json({ message: 'Parking spaces seeded successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to seed parking spaces' });
  }
};

module.exports = {
  getParkingSpaces,
  updateParkingSpace,
  seedParkingSpaces,
};
