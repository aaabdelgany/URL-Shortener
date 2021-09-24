const supertest = require('supertest');
const app = require('../server');
const api = supertest(app);

test('hello endpoint is working', async () => {
  await api
    .get('/api/hello')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8');
});

test('creating a new shortened URL', async () => {
  const newUrl = { url: 'http://abdutest.com' };
  const res = await api
    .post('/api/shorturl')
    .send(newUrl)
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(res.body.short_url).toBe(1);
  expect(res.body.original_url).toBe('http://abdutest.com');
});

test('getting a newly created shortened URL to make sure redirect works', async () => {
  const res = await api
    .get('/api/shorturl/1')
    .expect(302)
    .expect('Content-Type', /text\/plain/);
});
