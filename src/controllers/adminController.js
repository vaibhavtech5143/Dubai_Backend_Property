const asyncHandler = require('express-async-handler');
const Admin = require('../models/adminModel');
const generateToken = require('../utils/generateToken');

// @desc    Register a new admin
// @route   POST /api/admin/register
// @access  Public
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, username, password } = req.body;

  const adminExists = await Admin.findOne({ $or: [{ email }, { username }] });

  if (adminExists) {
    res.status(400);
    throw new Error('Admin already exists');
  }

  const admin = await Admin.create({
    name,
    email,
    username,
    password,
  });

  if (admin) {
    let tokenGenerated = generateToken(res, admin._id);
    res.body.token = tokenGenerated;
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      username: admin.username,
    });

  } else {
    res.status(400);
    throw new Error('Invalid admin data');
  }
});

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
   let cookie =  generateToken(res, admin._id);
   res.cookie('jwt', cookie);
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      username: admin.username,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Logout admin
// @route   POST /api/admin/logout
// @access  Private
const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
};