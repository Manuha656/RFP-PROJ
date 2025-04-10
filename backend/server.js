require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./User');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Serve login.html from frontend folder
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

// TEMPORARY: Insert a test user
app.get('/addtestuser', async (req, res) => {
  try {
    const user = new User({
      username: "testuser",
      email: "test@example.com",
      password: "1234"
    });
    await user.save();
    res.send("✅ Test user created.");
  } catch (err) {
    console.error(err);
    res.send("❌ Error creating user.");
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).send("❌ Username and password required.");
    }

    const user = await User.findOne({ username, password });
    if (user) {
      res.send(`✅ Login successful! Welcome, ${user.username}`);
    } else {
      res.send('❌ Invalid username or password.');
    }
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).send('❌ Server error.');
  }
});

// Register route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).send("❌ All fields are required.");
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.send('❌ Username already taken.');
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.send(`✅ User registered successfully! Welcome, ${username}`);
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).send('❌ Server error while registering.');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
