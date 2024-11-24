const request = require('supertest');
const app = require('../server'); // Import the app instance
const mongoose = require('mongoose');

describe('User Routes', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('should return 200 for successful login', async () => {
        const response = await request(app).post('/api/users/login').send({
            email: 'test@example.com',
            password: 'password123',
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    test('should return 400 for missing fields in login', async () => {
        const response = await request(app).post('/api/users/login').send({});
        expect(response.statusCode).toBe(400);
    });
});
