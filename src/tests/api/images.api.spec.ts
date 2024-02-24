import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);
describe('Test images api responses', () => {
  it('it should check invalid filename', async () => {
    const response = await request.get('/api/images?filename=abc');
    expect(response.status).toBe(400);
    expect(response.text).toBe('invalid filename');
  });

  it('it should check missing width/height', async () => {
    const response = await request.get('/api/images?filename=fjord');
    expect(response.status).toBe(400);
    expect(response.text).toBe('missing width or height');
  });

  it('it should check invalid width/height', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=1a&height=2b',
    );
    expect(response.status).toBe(400);
    expect(response.text).toBe('invalid width or height');
  });

  it('it should load file successfully', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=200&height=200',
    );
    expect(response.status).toBe(200);
  });
});
