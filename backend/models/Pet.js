const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  petName: String,
  petBreed: String,
  petAge: String,
  petType: String,
  location: String,
  description: String,
  contactEmail: String,
  image: String // We'll store image as a base64 string or a file path
});

module.exports = mongoose.model('Pet', petSchema);
