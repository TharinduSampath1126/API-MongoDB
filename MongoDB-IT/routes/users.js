import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      users: users.map(user => ({
        id: user.id, // Use custom id field
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        email: user.email,
        phone: user.phone,
        birthDate: user.birthDate.toISOString().split('T')[0] // Format as YYYY-MM-DD
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
});

// GET user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id }); // Find by custom id field
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      id: user.id, // Use custom id field
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      email: user.email,
      phone: user.phone,
      birthDate: user.birthDate.toISOString().split('T')[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
});

// POST create new user
router.post('/add', async (req, res) => {
  try {
    const { id, firstName, lastName, age, email, phone, birthDate } = req.body;
    
    // Create new user
    const newUser = new User({
      id, // Include the custom id field
      firstName,
      lastName,
      age,
      email,
      phone,
      birthDate: new Date(birthDate)
    });
    
    const savedUser = await newUser.save();
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      id: savedUser.id, // Use custom id field
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      age: savedUser.age,
      email: savedUser.email,
      phone: savedUser.phone,
      birthDate: savedUser.birthDate.toISOString().split('T')[0]
    });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate error (could be email or id)
      const field = Object.keys(error.keyPattern)[0];
      res.status(400).json({
        success: false,
        message: `${field === 'id' ? 'ID' : 'Email'} already exists`,
        error: `Duplicate ${field}`
      });
    } else if (error.name === 'ValidationError') {
      // Validation error
      const errors = Object.values(error.errors).map(err => err.message);
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error creating user',
        error: error.message
      });
    }
  }
});

// PUT update user
router.put('/:id', async (req, res) => {
  try {
    const { id, firstName, lastName, age, email, phone, birthDate } = req.body;
    
    const updatedUser = await User.findOneAndUpdate(
      { id: req.params.id }, // Find by custom id field
      {
        id, // Update the custom id field if provided
        firstName,
        lastName,
        age,
        email,
        phone,
        birthDate: new Date(birthDate)
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User updated successfully',
      id: updatedUser.id, // Use custom id field
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      age: updatedUser.age,
      email: updatedUser.email,
      phone: updatedUser.phone,
      birthDate: updatedUser.birthDate.toISOString().split('T')[0]
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      res.status(400).json({
        success: false,
        message: `${field === 'id' ? 'ID' : 'Email'} already exists`,
        error: `Duplicate ${field}`
      });
    } else if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error updating user',
        error: error.message
      });
    }
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ id: req.params.id }); // Find by custom id field
    
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
});

export default router;