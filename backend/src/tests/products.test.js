import request from 'supertest';
import app from '../index.js';

describe('products API', () => {
  it('lists products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
  });
});
