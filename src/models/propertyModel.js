const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  imageUrl: { type: String },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: Number, required: true },
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
