const express = require('express');
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/logout', protect, logoutAdmin);

module.exports = router;