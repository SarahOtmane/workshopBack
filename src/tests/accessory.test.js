const supertest = require('supertest');
const mongoose = require('mongoose');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { app, server } = require('../app'); 
const Accessory = require('../models/accessoryModel');
const User = require('../models/userModel');
const connectDB = require('../services/connectDB');

let token;
describe('POST /accessories', () => {
    beforeAll(
        async () => { await connectDB(); 
        const hashedPassword = await argon2.hash('test');
        await User.create({
            email: 'test@gmail.com',
            password: hashedPassword,
        });

        const response = await supertest(app)
            .post('/users/login')
            .send({
                email: 'test@gmail.com',
                password: 'test',
            });

            token = response.body.token;

            console.log(token);
    });
    beforeEach(async () => { await Accessory.deleteMany({}) });
    afterAll(async () => { 
        await User.deleteMany({});
        await mongoose.disconnect(); 
        server.close();
    });

    it('should return 403 if the name is empty', async() => {
        const response = await supertest(app)
            .post('/accessories')
            .send({
                options: ['bleue', 'noir'],
                price: 245,
            })
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe("L'un des champs est vide !");
    });

    it('should return 403 if the options is empty', async() => {
        const response = await supertest(app)
            .post('/accessories')
            .send({
                name: 'Coque',
                price: 245,
            })
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe("L'un des champs est vide !");
    });

    it('should return 403 if the price is empty', async() => {
        const response = await supertest(app)
            .post('/accessories')
            .send({
                options: ['bleue', 'noir'],
                name: 'Console',
            })
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe("L'un des champs est vide !");
    });

    it('should return 403 if the accessory is already in the database', async() => {
        await Accessory.create({
            name: 'Coque',
            price: 245,
            options: ['bleue', 'noir'],
        })

        const response = await supertest(app)
            .post('/accessories')
            .send({
                name: 'Coque',
                price: 245,
                options: ['bleue', 'noir'],
            })
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe("Vous avez déja créer cet accessoire !");
    });

    it('should return 201 if the accessory is created', async() => {
        const response = await supertest(app)
            .post('/accessories')
            .send({
                name: 'Coque',
                price: 245,
                options: ['bleue', 'noir'],
            })
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("Accessoire créé avec succès");
    });
    
    
});
