const request = require('supertest');
const app = require('../src/app');

describe('Post Endpoints', () => {
    let token;

    beforeAll(async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: 'test@example.com',
            password: 'Password123',
        });
        token = res.body.token;
    });

    it('should create a new post', async () => {
        const res = await request(app)
            .post('/api/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Post',
                topic: 'Tech',
                body: 'This is a test post.',
                expirationTime: '2023-12-31T23:59:59Z',
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('post');
    });

    it('should fetch posts by topic', async () => {
        const res = await request(app).get('/api/posts?topic=Tech');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('posts');
    });
});
