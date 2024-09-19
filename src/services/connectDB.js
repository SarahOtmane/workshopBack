const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    // Vérifier l'environnement actuel
    const isTestEnv = process.env.NODE_ENV === 'test';

    // Choisir les bonnes variables selon l'environnement
    const dbUser = isTestEnv ? process.env.DB_USER_TEST: process.env.DB_USER;
    const dbPassword = isTestEnv ? process.env.DB_PASSWORD_TEST : process.env.DB_PASSWORD;
    const dbName = isTestEnv ? process.env.DB_NAME_TEST : process.env.DB_NAME;

    try {
        await mongoose.connect(`mongodb://${dbUser}:${dbPassword}@db:27017/${dbName}?authSource=admin`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to MongoDB ${dbName}`);
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

module.exports = connectDB;
