const mongoose = require('mongoose');

const timeTrialSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  trackName: {
    type: String,
    required: true
  },
  time: {
    type: String, // Store as string in format "MM:SS.mmm"
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  character: {
    type: String,
    required: true
  },
  vehicle: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TimeTrial', timeTrialSchema);
