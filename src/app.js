const express = require('express')
const app = express()  
const port = 3030;

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./doc/swagger-config.js');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@db:27017/${process.env.DB_NAME}?authSource=admin`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`Connected to MongoDB ${process.env.DB_NAME}`);
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.use(express.urlencoded());
app.use(express.json());

const userRoute = require('./routes/userRoute.js');
const accessoryRoute = require('./routes/accessoryRoute.js');
const productController = require('./routes/productRoute.js');

userRoute(app);
accessoryRoute(app);
productController(app);

app.listen(port, () =>{
    console.log(`Example app listenning on port ${port}`);
})
