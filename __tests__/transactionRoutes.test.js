const request = require('supertest');
const app = require('../server'); // the main Express server
const mongoose = require('mongoose');

describe('Transaction Routes', () => {
    // Connect to the test database before running the tests
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    // Disconnect from the database after the tests
    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('should return 400 for invalid transaction input', async () => {
        const response = await request(app).post('/api/transactions').send({});
        expect(response.statusCode).toBe(400);
    });
});
