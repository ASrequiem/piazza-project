const request = require('supertest');
const app = require('../src/app'); // Assuming `app.js` initializes the Express server

describe('Authentication Endpoints', () => {
    it('should register a new user', async () => {
        const res = await request(app).post('/api/auth/register').send({
            username: 'testuser',
            email: 'test@example.com',
            password: 'Password123',
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('token');
    });

    it('should log in a user', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: 'test@example.com',
            password: 'Password123',
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });
});
