const express = require('express');
const router = express.Router();
const { registerUser, loginUser, googleAuth, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleAuth);
router.route('/profile').get(protect, getUserProfile);

module.exports = router;
