const Reservation = require('../models/reservationModel');
const ParkingSlot = require('../models/parkingModel');

// Create a new reservation
const createReservation = async (req, res) => {
  const { parkingSlotId, startTime, endTime } = req.body;

  try {
    const slot = await ParkingSlot.findById(parkingSlotId);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    if (!slot.isAvailable) {
      return res.status(400).json({ message: 'Slot is already reserved' });
    }

    // Create the reservation
    const reservation = new Reservation({
      parkingSlotId,
      userId: req.user.id, // Assuming user ID is extracted from the token
      startTime,
      endTime,
    });

    await reservation.save();

    // Update the slot status
    slot.isAvailable = false;
    await slot.save();

    res.status(201).json({ message: 'Reservation created successfully', reservation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating reservation', error });
  }
};

module.exports = {
  createReservation,
};
