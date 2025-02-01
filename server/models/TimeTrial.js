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
  timeInMs: {  // Store time in milliseconds
    type: Number,
    required: true
  },
  character: {
    type: String,
    required: true
  },
  vehicle: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add virtual property for formatted time
timeTrialSchema.virtual('formattedTime').get(function() {
  const minutes = Math.floor(this.timeInMs / (60 * 1000));
  const seconds = Math.floor((this.timeInMs % (60 * 1000)) / 1000);
  const milliseconds = this.timeInMs % 1000;
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
});

// Include virtuals when converting to JSON
timeTrialSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('TimeTrial', timeTrialSchema);
