
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
const Organizer = require('./Organizer');  // Import the Organizer.js

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

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

// Route: Organizer Registration
app.post('/organizer/register', async (req, res) => {
  const { organizerName, email, phone, password, eventName, speakerName, eventDate, availableTickets } = req.body;

  if (!organizerName || !email || !phone || !password || !eventName || !speakerName || !eventDate || !availableTickets) {
    return res.status(400).json({ success: false, message: '❌ All fields are required.' });
  }

  try {
    const existingOrganizer = await Organizer.findOne({ email });
    if (existingOrganizer) {
      return res.status(409).json({ success: false, message: '⚠️ Organizer with this email already exists.' });
    }

    const newOrganizer = new Organizer({
      organizerName,
      email,
      phone,
      password,
      eventName,
      speakerName,
      eventDate,
      availableTickets
    });

    await newOrganizer.save();

    return res.status(201).json({ success: true, message: '✅ Organizer registration successful!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: '❌ Organizer registration failed. Try again later.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
