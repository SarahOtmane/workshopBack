const express = require('express');
const app = express();
const port = 3030;

// Load environment variables
require('dotenv').config();

// Import and connect to the database
const connectDB = require('./db.js');
connectDB();

// Configure routes and middleware
const configureServices = require('./service-config.js');
configureServices(app);

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
