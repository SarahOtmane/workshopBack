const supertest = require('supertest');
const mongoose = require('mongoose');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const app = require('../app'); 
const User = require('../models/userModel');
const connectDB = require('../services/connectDB');

describe('POST /users/login', () => {

    beforeAll(async () => { await connectDB(); });

    afterAll(async () => { await mongoose.disconnect(); });

    beforeEach(async () => { await User.deleteMany({}); });

    it('should return 404 if the user is not found', async () => {
        const response = await supertest(app)
            .post('/users/login')
            .send({
                email: 'inconnu@gmail.com',
                password: 'test',
            });

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Email ou password incorrect');
    });

    it('should return 401 if the password is not correct', async () => {
        await User.create({
            email: 'test@gmail.com',
            password: await argon2.hash('test'),
        });

        const response = await supertest(app)
            .post('/users/login')
            .send({
                email: 'test@gmail.com',
                password: 'motdepasseincorrect',
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Email ou password incorrect');
    });

    it('should return 201 if the user is logged', async () => {
        await User.create({
            email: 'test@gmail.com',
            password: await argon2.hash('test'),
        });

        const response = await supertest(app)
            .post('/users/login')
            .send({
                email: 'test@gmail.com',
                password: 'test',
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('token');

        const decodedToken = jwt.verify(response.body.token, process.env.JWT_KEY);
        expect(decodedToken.email).toBe('test@gmail.com');
    });

    it('should return 500 if error service', async () => {
        jest.spyOn(User, 'findOne').mockImplementationOnce(() => {
            throw new Error('Erreur serveur');
        });

        const response = await supertest(app)
            .post('/users/login')
            .send({
                email: 'test@gmail.com',
                password: 'motdepassecorrect',
            });

        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe('Une erreur s\'est produite lors du traitement');
    });
});
