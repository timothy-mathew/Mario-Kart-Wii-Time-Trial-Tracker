const TimeTrial = require('../models/TimeTrial');

// Get all time trials for a user
exports.getTimeTrials = async (req, res) => {
  try {
    const timeTrials = await TimeTrial.find({ userId: req.userId })
      .sort({ date: -1 });
    res.json(timeTrials);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

// Create a new time trial
exports.createTimeTrial = async (req, res) => {
  try {
    const timeTrial = new TimeTrial({
      userId: req.userId,
      trackName: req.body.trackName,
      timeInMs: req.body.timeInMs,
      character: req.body.character,
      vehicle: req.body.vehicle,
      date: req.body.date || new Date()
    });

    const newTimeTrial = await timeTrial.save();
    res.status(201).json(newTimeTrial);
  } catch (error) {
    console.error('Error creating time trial:', error);
    res.status(400).json({ message: error.message });
  }
};

// Delete a time trial
exports.deleteTimeTrial = async (req, res) => {
  try {
    const timeTrial = await TimeTrial.findOneAndDelete({ 
      _id: req.params.id,
      userId: req.userId 
    });

    if (!timeTrial) {
      return res.status(404).json({ message: 'Time trial not found' });
    }

    res.json({ message: 'Time trial deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a time trial
exports.updateTimeTrial = async (req, res) => {
  try {
    const timeTrial = await TimeTrial.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      {
        $set: {
          trackName: req.body.trackName,
          timeInMs: req.body.timeInMs,
          character: req.body.character,
          vehicle: req.body.vehicle,
          date: req.body.date
        }
      },
      { new: true }
    );

    if (!timeTrial) {
      return res.status(404).json({ message: 'Time trial not found' });
    }

    res.json(timeTrial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};