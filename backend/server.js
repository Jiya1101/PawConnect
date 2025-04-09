console.log("✅ Starting server.js...");

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

console.log("✅ Middleware setup started");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, '..')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

console.log("✅ Attempting MongoDB connection...");

mongoose.connect('mongodb://127.0.0.1:27017/pawconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.log('❌ DB connection error:', err));

console.log("✅ Loading routes...");

const strayRoutes = require('./routes/stray');
const authRoutes = require('./routes/auth');
const petRoutes = require('./routes/petRoutes'); 

console.log("✅ Routes loaded, applying to app...");

app.use('/api/strays', strayRoutes);
app.use('/api', authRoutes);
app.use('/api/pets', petRoutes); 

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
