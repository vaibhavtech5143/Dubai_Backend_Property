const express = require('express');
const router = express.Router();
const {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
  .get(getProperties)
  .post(upload.single('image'), createProperty);

router.route('/:id')
  .get(getPropertyById)
  .put(protect, upload.single('image'), updateProperty)
  .delete(protect, deleteProperty);

module.exports = router;