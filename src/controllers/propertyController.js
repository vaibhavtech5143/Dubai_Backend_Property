const asyncHandler = require('express-async-handler');
const Property = require('../models/propertyModel');
const cloudinary = require('../config/cloudinary');
const uploadToCloudinary = require('../utils/coudinaryUpload.js');


// @desc    Create a new property
// @route   POST /api/properties
// @access  Private/Admin
// @desc    Create a new property
const createProperty = asyncHandler(async (req, res) => {
  const { title, description, price, location, bedrooms, bathrooms, area } = req.body;

  if (!title || !description || !price || !location || !bedrooms || !bathrooms || !area) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }

  if (!req.file) {
    res.status(400);
    throw new Error('Please upload an image');
  }

  const imageUrl = await uploadToCloudinary(req.file);

  const property = await Property.create({
    title,
    description,
    price: Number(price),
    location,
    imageUrl,
    bedrooms: Number(bedrooms),
    bathrooms: Number(bathrooms),
    area: Number(area),
  });

  res.status(201).json(property);
});


// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
const getProperties = asyncHandler(async (req, res) => {
  const properties = await Property.find({});
  res.json(properties);
});

// @desc    Get property by ID
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  
  if (property) {
    res.json(property);
  } else {
    res.status(404);
    throw new Error('Property not found');
  }
});



// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private/Admin
const updateProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (property) {
    property.title = req.body.title || property.title;
    property.description = req.body.description || property.description;
    property.price = req.body.price || property.price;
    property.location = req.body.location || property.location;
    property.bedrooms = req.body.bedrooms || property.bedrooms;
    property.bathrooms = req.body.bathrooms || property.bathrooms;
    property.area = req.body.area || property.area;

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
      
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'properties',
      });
      
      property.imageUrl = result.secure_url;
    }

    const updatedProperty = await property.save();
    res.json(updatedProperty);
  } else {
    res.status(404);
    throw new Error('Property not found');
  }
});

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private/Admin
const deleteProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (property) {
    await property.deleteOne();
    res.json({ message: 'Property removed' });
  } else {
    res.status(404);
    throw new Error('Property not found');
  }
});

module.exports = {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};