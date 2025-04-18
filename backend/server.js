
// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const path = require('path');
// const cors = require('cors');
// const User = require('./User');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '../frontend')));

// // MongoDB Connection
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('✅ Connected to MongoDB Atlas'))
//   .catch((err) => console.error('❌ MongoDB connection error:', err));

// // Route: Serve login page
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/login.html'));
// });

// // Route: Register
// app.post('/register', async (req, res) => {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     return res.status(400).json({ success: false, message: '❌ All fields are required.' });
//   }

//   try {
//     const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//     if (existingUser) {
//       return res.status(409).json({ success: false, message: '⚠️ Username or email already exists.' });
//     }

//     const newUser = new User({ username, email, password });
//     await newUser.save();
//     return res.status(201).json({ success: true, message: '✅ Registration successful!' });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ success: false, message: '❌ Registration failed. Try again later.' });
//   }
// });

// // Route: Login
// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ success: false, message: '❌ Username and password required.' });
//   }

//   try {
//     const user = await User.findOne({ username, password });
//     if (user) {
//       return res.json({ success: true, message: `✅ Login successful! Welcome, ${user.username}` });
//     } else {
//       return res.status(401).json({ success: false, message: '❌ Invalid credentials.' });
//     }
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ success: false, message: '❌ Login failed. Please try again later.' });
//   }
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running at http://localhost:${PORT}`);
// });


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const User = require('./User');
const Organizer = require('./Organizer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));

// MongoDB Connection with improved error handling
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit if DB connection fails
  });

// Route: Serve login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

// Route: Register (User Registration)
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: '❌ All fields are required.' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ success: false, message: '⚠️ Username or email already exists.' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();
    return res.status(201).json({ success: true, message: '✅ Registration successful!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: '❌ Registration failed. Try again later.' });
  }
});

// Route: Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: '❌ Username and password required.' });
  }

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      return res.json({ success: true, message: `✅ Login successful! Welcome, ${user.username}` });
    } else {
      return res.status(401).json({ success: false, message: '❌ Invalid credentials.' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: '❌ Login failed. Please try again later.' });
  }
});

// Route: Organizer Registration (Improved)
app.post('/organizer/register', async (req, res) => {
  const { 
    organizerName, 
    email, 
    phone, 
    password, 
    eventName, 
    speakerName, 
    eventDate, 
    availableTickets 
  } = req.body;

  // Validate required fields
  if (!organizerName || !email || !phone || !password || !eventName || !speakerName || !eventDate || !availableTickets) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required.' 
    });
  }

  // Validate phone number format
  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide a valid 10-digit phone number.' 
    });
  }

  try {
    // Check if organizer already exists
    const existingOrganizer = await Organizer.findOne({ email });
    if (existingOrganizer) {
      return res.status(409).json({ 
        success: false, 
        message: 'Organizer with this email already exists.' 
      });
    }

    // Create new organizer
    const newOrganizer = new Organizer({
      organizerName,
      email: email.toLowerCase(),
      phone,
      password,
      eventName,
      speakerName,
      eventDate: new Date(eventDate),
      availableTickets: parseInt(availableTickets)
    });

    // Save to database
    await newOrganizer.save();

    // Return success response
    return res.status(201).json({ 
      success: true, 
      message: 'Organizer registration successful!',
      organizer: {
        organizerName,
        email,
        phone,
        eventName,
        speakerName,
        eventDate,
        availableTickets
      }
    });
  } catch (err) {
    console.error('Organizer registration error:', err);
    return res.status(500).json({ 
      success: false, 
      message: 'Organizer registration failed. Please try again later.' 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
