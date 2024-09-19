const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./doc/swagger-config.js');
const userRoute = require('./routes/userRoute.js');
const accessoryRoute = require('./routes/accessoryRoute.js');
const productController = require('./routes/productRoute.js');

const configureServices = (app) => {
    // Swagger documentation route
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Middleware for parsing requests
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Define application routes
    userRoute(app);
    accessoryRoute(app);
    productController(app);
};

module.exports = configureServices;
