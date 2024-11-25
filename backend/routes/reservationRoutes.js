const express = require('express');
const { createReservation, getReservations } = require('../controllers/reservationController');
const router = express.Router();

router.post('/create', createReservation);
// router.get('/get', getReservations);

module.exports = router;
