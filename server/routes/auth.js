const express = require('express');
const router = express.Router();
// const { googleAuth } = require('../controllers/authController');
router.get('/', (req, res) => {
    res.json({ message: "Auth route is working!" });
  });
  
// router.post('/google', googleAuth);

module.exports = router;
