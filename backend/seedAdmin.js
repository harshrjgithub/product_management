require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        const adminEmail = 'admin@example.com';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('Admin user already exists!');
            process.exit();
        }

        const adminUser = new User({
            name: 'Admin User',
            email: adminEmail,
            password: 'password123',
            role: 'admin'
        });

        await adminUser.save();
        console.log('Admin user seeded successfully with email: admin@example.com, password: password123');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedAdmin();
