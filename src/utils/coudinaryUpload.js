const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (file) => {
  const b64 = Buffer.from(file.buffer).toString('base64');
  const dataURI = `data:${file.mimetype};base64,${b64}`;

  const result = await cloudinary.uploader.upload(dataURI, {
    folder: 'properties',
    allowed_formats: ['jpg', 'png'],
  });

  if (!result || !result.secure_url) {
    throw new Error('Failed to upload image to Cloudinary');
  }

  return result.secure_url;
};

module.exports = uploadToCloudinary;
