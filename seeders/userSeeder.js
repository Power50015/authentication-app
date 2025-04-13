// seeders/userSeeder.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/model/userModel');
const { createUserData } = require('../factories/userFactory');

// Connect to DB
async function connectDB() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in your environment.');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding.');
  } catch (err) {
    console.error('Seeding connection error:', err);
    process.exit(1);
  }
}

// Seed function
async function seedUsers() {
  try {
    // For example, create 5 random users
    for (let i = 0; i < 5; i++) {
      const userData = await createUserData();
      await User.create(userData);
      console.log(`Seeded user: ${userData.email}`);
    }

    // Create a known admin user
    const adminData = await createUserData({ email: 'admin@example.com', password: 'secretAdmin123' });
    await User.create(adminData);
    console.log('Seeded admin user: admin@example.com');
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run seeding
connectDB().then(seedUsers);