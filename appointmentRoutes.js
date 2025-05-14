const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Add appointment (User)
router.post('/add', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json({ message: 'Appointment added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add appointment', error: err.message });
  }
});

// Get all appointments (Admin)
router.get('/all', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch appointments', error: err.message });
  }
});

// Delete appointment by ID (Admin)
router.delete('/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete appointment', error: err.message });
  }
});

module.exports = router;
