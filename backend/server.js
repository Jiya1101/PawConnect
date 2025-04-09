const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend (optional)
app.use(express.static(path.join(__dirname, '..')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/pawconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('DB connection error:', err));

// Routes
const strayRoutes = require('./routes/stray');
const authRoutes = require('./routes/auth');
const petRoutes = require('./routes/petRoutes'); 

app.use('/api/strays', strayRoutes);
app.use('/api', authRoutes);
app.use('/api/pets', petRoutes); 
app.use('/api', petRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
