require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');

const testCart = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        // Find a random user and product
        const user = await User.findOne({ role: 'user' });
        const product = await Product.findOne();

        if (!user || !product) {
            console.log('Need both a user and product to test');
            process.exit();
        }

        console.log(`Testing with User: ${user.email} and Product: ${product.productName}`);

        const productId = product._id;
        const quantity = 1;

        const alreadyInCart = user.cart.find(
            (item) => item.product.toString() === productId.toString()
        );

        if (alreadyInCart) {
            alreadyInCart.quantity += Number(quantity) || 1;
        } else {
            console.log('Adding new item to cart array');
            user.cart.push({
                product: productId,
                quantity: Number(quantity) || 1
            });
        }

        console.log('Attempting to save user with updated cart...');
        await user.save();
        console.log('Save successful. Cart length:', user.cart.length);
        
        process.exit();
    } catch (error) {
        console.error('CART TEST ERROR:', error);
        process.exit(1);
    }
};

testCart();
