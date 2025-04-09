const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const multer = require('multer');
const path = require('path');

// Setup multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/list-pet', upload.single('petImage'), async (req, res) => {
  try {
    console.log("Received form data:", req.body);
    console.log("Received file:", req.file);

    const pet = new Pet({
      name: req.body.name,
      breed: req.body.breed,
      age: req.body.age,
      type: req.body.type,
      location: req.body.location,
      description: req.body.description,
      contactEmail: req.body.contactEmail,
      image: req.file ? req.file.filename : ''
    });

    await pet.save();
    res.status(201).json({ message: 'Pet listed successfully' });
  } catch (err) {
    console.error('Error while saving pet:', err);
    res.status(500).json({ error: 'Failed to list pet' });
  }
});


module.exports = router;
