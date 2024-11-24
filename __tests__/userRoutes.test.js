const request = require('supertest'); // Import Supertest for HTTP request testing
const app = require('../server'); // Import the app instance
const mongoose = require('mongoose'); // Import Mongoose for database connection

describe('User Routes', () => {
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

    // Test: Register a new user successfully
    test('should register a new user successfully', async () => {
        const uniqueEmail = `testuser_${Date.now()}@example.com`; // Generate a unique email
        const response = await request(app).post('/api/users/register').send({
            name: 'Test User',
            email: uniqueEmail,
            password: 'password123',
        });
        expect(response.statusCode).toBe(201); // Expect status 201 for success
        expect(response.body.message).toBe('User registered successfully'); // Confirm success message
    });

    // Test: Should not register a user with an existing email
    test('should not register a user with an existing email', async () => {
        const email = `duplicateuser@example.com`;

        // First registration
        await request(app).post('/api/users/register').send({
            name: 'Test User',
            email,
            password: 'password123',
        });

        // Second registration with the same email
        const response = await request(app).post('/api/users/register').send({
            name: 'Test User',
            email,
            password: 'password123',
        });

        expect(response.statusCode).toBe(400); // Expect status 400 for duplicate email
        expect(response.body.message).toBe('User already exists');
    });

    // Test: Login a user successfully
    test('should login a user successfully', async () => {
        const uniqueEmail = `testuser_${Date.now()}@example.com`;

        // Register the user first
        await request(app).post('/api/users/register').send({
            name: 'Test User',
            email: uniqueEmail,
            password: 'password123',
        });

        // Attempt to log in
        const response = await request(app).post('/api/users/login').send({
            email: uniqueEmail,
            password: 'password123',
        });

        expect(response.statusCode).toBe(200); // Expect status 200 for success
        expect(response.body).toHaveProperty('token'); // Ensure a token is returned
    });

    // Test: Should not login with invalid credentials
    test('should return 401 for invalid login credentials', async () => {
        const response = await request(app).post('/api/users/login').send({
            email: 'nonexistent@example.com',
            password: 'wrongpassword',
        });

        expect(response.statusCode).toBe(401); // Expect status 401 for unauthorized
        expect(response.body.message).toBe('Invalid credentials');
    });
});
