const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
  getTimeTrials, 
  createTimeTrial, 
  deleteTimeTrial 
} = require('../controllers/timeTrialController');

// All routes require authentication
router.use(auth);

// Get all time trials for the authenticated user
router.get('/', getTimeTrials);

// Create a new time trial
router.post('/', createTimeTrial);

// Delete a time trial
router.delete('/:id', deleteTimeTrial);

module.exports = router;
