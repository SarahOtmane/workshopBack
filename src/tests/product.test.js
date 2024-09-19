const supertest = require('supertest');
const mongoose = require('mongoose');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const app = require('../app'); 
const Product = require('../models/productModel');
const connectDB = require('../services/connectDB');


describe('POST /products', () => {
    beforeAll(async () => { await connectDB(); });
    afterAll(async () => { await mongoose.disconnect(); });
    beforeEach(async () => { await Product.deleteMany({}); });

    it('should return 403 if the name is empty', async() => {
        const response = await supertest(app)
            .post('/products')
            .send({
                attributes: [{name: 'coque', option: 'bleue'}],
                price: 245,
            });

        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe("L'un des champs est vide !");
    });
    
});
