const Reservation = require('../models/reservationModel');
const ParkingSlot = require('../models/parkingModel');

// Create a new reservation
const createReservation = async (req, res) => {
  const { parkingSlotId, startTime, endTime } = req.body;

  try {
    // Find the parking slot
    const slot = await ParkingSlot.findById(parkingSlotId);
    if (!slot) {
      return res.status(404).json({ message: 'Parking slot not found' });
    }

    if (slot.status === 'occupied') {
      return res.status(400).json({ message: 'Slot is already reserved' });
    }

    // Create the reservation
    const reservation = new Reservation({
      parkingSlotId,
      userId: req.user.id, // Extracted from token
      startTime,
      endTime,
    });

    await reservation.save();

    // Update the parking slot status
    slot.status = 'occupied';
    slot.reservedBy = req.user.id;
    await slot.save();

    res.status(201).json({ message: 'Reservation successful', reservation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during reservation', error });
  }
};

module.exports = {
  createReservation,
};
