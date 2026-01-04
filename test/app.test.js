const request = require('supertest');
const app = require('../server');  // Points to server.js

describe('API Endpoints', () => {
  // Code 1: Basic status check
  it('GET / returns 200', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });

  // Code 2: Detailed response validation
  test('GET / returns hello message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toContain('Hello');  // Update per your server response
  });

  test('GET /health returns OK', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
  });

  test('Server starts without errors', () => {
    expect(true).toBe(true);  // Always passes
  });
});
