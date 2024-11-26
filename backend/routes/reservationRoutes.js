const express = require('express');
const { createReservation } = require('../controllers/reservationController');
const { validateToken } = require('../middlewares/jwtMiddleware');

const router = express.Router();

// POST /api/create - Create a reservation
router.post('/create', validateToken, createReservation);

module.exports = router;
