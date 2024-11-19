const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const user = new User({ name, email, phone, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserDetails = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Fetch user details by ID
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Exclude sensitive fields like password
      const { password, ...userWithoutPassword } = user.toObject();
  
      res.status(200).json(userWithoutPassword);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const myAccount = async (req, res) => {
    const userId = req.user.userId;  // Extract userId from the token
    
    try {
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const updateProfile = async (req, res) => {

    const {firstName,lastName, email, password, phoneNumber} = req.body;
    const userId = req.user.userId; 

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(200).json({
        message: "Profile updated successfully",
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
        },
    });

};

module.exports = { register, login, getUserDetails, myAccount, updateProfile };
