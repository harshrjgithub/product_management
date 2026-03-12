const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');

router.route('/')
    .get(protect, getCart)
    .post(protect, addToCart);

router.route('/:productId')
    .delete(protect, removeFromCart);

module.exports = router;
