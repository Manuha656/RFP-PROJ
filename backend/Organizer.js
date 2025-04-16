const mongoose = require('mongoose');

// Define the Organizer schema
const organizerSchema = new mongoose.Schema({
  organizerName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure email is unique
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address.'],
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number.'], // Phone number validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6,  // Ensure password is at least 6 characters long
  },
  eventName: {
    type: String,
    required: true,
    trim: true,
  },
  speakerName: {
    type: String,
    required: true,
    trim: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  availableTickets: {
    type: Number,
    required: true,
    min: 1,  // Ensure there is at least one ticket available
    max: 100,  // Limit the available tickets to 100
  },
});

// Create and export the Organizer model
const Organizer = mongoose.model('Organizer', organizerSchema);

module.exports = Organizer;
