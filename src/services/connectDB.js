const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    // Vérifier l'environnement actuel
    const isTestEnv = process.env.NODE_ENV === 'test';

    // Choisir les bonnes variables selon l'environnement
    const dbUser = isTestEnv ? process.env.TEST_DB_USER : process.env.DEV_DB_USER;
    const dbPassword = isTestEnv ? process.env.TEST_DB_PASSWORD : process.env.DEV_DB_PASSWORD;
    const dbName = isTestEnv ? process.env.TEST_DB_NAME : process.env.DEV_DB_NAME;

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
