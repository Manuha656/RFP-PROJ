const mongoose = require('mongoose');

// Define the Organizer schema
const organizerSchema = new mongoose.Schema({
  organizerName: {
    type: String,
    required: [true, 'Organizer name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  eventName: {
    type: String,
    required: [true, 'Event name is required'],
    trim: true,
  },
  speakerName: {
    type: String,
    required: [true, 'Speaker name is required'],
    trim: true,
  },
  eventDate: {
    type: Date,
    required: [true, 'Event date is required'],
  },
  availableTickets: {
    type: Number,
    required: [true, 'Available tickets count is required'],
  },
}, { timestamps: true }); // Add timestamps for debugging

// Create and export the Organizer model
const Organizer = mongoose.model('Organizer', organizerSchema);

module.exports = Organizer;
