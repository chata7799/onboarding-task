const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/useRoutes'); // Adjust if needed
const config = require('./config');
const User = require('./models/User'); // ✅ Import the User model

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Home route
app.get('/', (req, res) => {
  res.send('API is working on Heroku!');
});

// ✅ /data route to fetch all users from MongoDB
app.get('/data', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching users from MongoDB:", err); // 👈 Add this line
    res.status(500).json({ error: 'Failed to fetch data from MongoDB' });
  }
});


// /user routes
app.use('/user', userRoutes);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
