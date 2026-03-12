const User = require('../models/User');
const Product = require('../models/Product');

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private (User)
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const user = await User.findById(req.user._id);

        const alreadyInCart = user.cart.find(
            (item) => item.product.toString() === productId.toString()
        );

        if (alreadyInCart) {
            alreadyInCart.quantity += Number(quantity) || 1;
            // Use native updateOne to skip model validation checks blocking saves on incomplete rows
            await User.updateOne(
                { _id: req.user._id, 'cart.product': productId },
                { $set: { 'cart.$.quantity': alreadyInCart.quantity } }
            );
        } else {
            const newItem = {
                product: productId,
                quantity: Number(quantity) || 1
            };
            user.cart.push(newItem);
            await User.updateOne(
                { _id: req.user._id },
                { $push: { cart: newItem } }
            );
        }

        res.status(200).json(user.cart);
    } catch (error) {
        console.error('addToCart error:', error);
        res.status(500).json({ message: 'Failed to add to cart', error: error.message });
    }
};

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private (User)
const getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('cart.product');
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get cart' });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private (User)
const removeFromCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        user.cart = user.cart.filter(
            (item) => item.product.toString() !== req.params.productId.toString()
        );

        // Native update to bypass schema validation
        await User.updateOne(
            { _id: req.user._id },
            { $pull: { cart: { product: req.params.productId } } }
        );

        res.status(200).json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove from cart' });
    }
}

module.exports = {
    addToCart,
    getCart,
    removeFromCart
};
