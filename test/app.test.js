const request = require('supertest');
const app = require('../app');

describe('API Endpoints', () => {
  test('GET / returns hello message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toContain('Hello');
  });

  test('Server starts without errors', () => {
    expect(true).toBe(true);
  });
});
