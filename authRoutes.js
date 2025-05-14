 const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  try {
    const { fullName, email, phone, password, role } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // make sure password is hashed
    const user = new User({
      fullName,
      email: normalizedEmail,
      phone,
      password: hashedPassword,
      role,
    });

    await user.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Registration failed', error: err.message });
  }
});


// LOGIN ROUTE



router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // 1) Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  // 2) Find user by email
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email.' });
  }

  // 3) Check password
  if (user.password !== password) {
    return res.status(401).json({ message: 'Invalid password.' });
  }

  // 4) Success!
  return res.json({ message: 'Login successful', user });
});

module.exports = router;



module.exports = router;


