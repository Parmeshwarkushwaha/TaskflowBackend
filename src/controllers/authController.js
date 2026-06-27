const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validateRegister, validateLogin } = require('../validators/authValidators');

const createToken = (userId) => jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
  expiresIn: '7d',
});

exports.register = async (req, res) => {
  const errors = validateRegister(req.body);
  if (errors.length) {
    return res.status(400).json({ message: errors.join(' ') });
  }

  const existingUser = await User.findOne({ email: req.body.email.toLowerCase().trim() });
  if (existingUser) {
    return res.status(409).json({ message: 'A user with that email already exists.' });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  const user = await User.create({
    name: req.body.name.trim(),
    email: req.body.email.toLowerCase().trim(),
    password: hashedPassword,
  });

  const token = createToken(user._id);

  return res.status(201).json({
    message: 'Registration successful.',
    data: {
      user: user.toJSON(),
      token,
    },
  });
};

exports.login = async (req, res) => {
  const errors = validateLogin(req.body);
  if (errors.length) {
    return res.status(400).json({ message: errors.join(' ') });
  }

  const user = await User.findOne({ email: req.body.email.toLowerCase().trim() });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const token = createToken(user._id);

  return res.status(200).json({
    message: 'Login successful.',
    data: {
      user: user.toJSON(),
      token,
    },
  });
};

exports.profile = async (req, res) => res.status(200).json({
  message: 'Profile retrieved successfully.',
  data: { user: req.user.toJSON() },
});
