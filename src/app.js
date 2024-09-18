const express = require('express')
const app = express()  
const port = 3030;

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./doc/swagger-config.js');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/workshop1');


app.use(express.urlencoded());
app.use(express.json());

app.listen(port, () =>{
    console.log(`Example app listenning on port ${port}`);
})
