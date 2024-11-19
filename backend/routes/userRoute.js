const express = require('express');
const {generateToken, validateToken} = require('../middlewares/jwtMiddleware');
const { register, login, getUserDetails, myAccount, updateProfile } = require('../controllers/userController');

const router = express.Router();

// Routes
router.post('/register', register);
router.post('/login', login);
router.get('/user/:id', getUserDetails); 
router.get("/myAccount",  validateToken, myAccount);
router.put("/myAccount", validateToken, updateProfile);
router.post("/myAccount",  validateToken, myAccount);

module.exports = router;
