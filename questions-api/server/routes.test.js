/*
* @jest-environment node
*/
import request from 'supertest';
import express from 'express';
import router from './routes.js';

const app = new express();
app.use(express.json());
app.use('/', router);

// jest.useFakeTimers();
// const

describe('Good Home Routes', function () {

  test('responds to /', async () => {
    const res = await request(app).get('/');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual('API service up');
  });

  test('responds to /qa/questions', async () => {
    const res = await request(app).get('/qa/questions?product_id=1');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text).product_id).toEqual('1');
  });


  test('responds to /qa/questions/:question_id/answers', async () => {
    const res = await request(app).get('/qa/questions/1/answers');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text).results[0].answer_id).toEqual(5);
  });

  test('responds to /qa/questions/:question_id/helpful', async () => {
    const res = await request(app).put('/qa/questions/1/helpful');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
    // console.log(res.text);
    expect(res.text).toEqual('helpful updated');
  });

  test('responds to /qa/answers/:answer_id/helpful', async () => {
    const res = await request(app).put('/qa/answers/1/helpful');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
    // console.log(res.text);
    expect(res.text).toEqual('helpful updated');
  });

  test('responds to /qa/questions', async () => {
    const res = await request(app).post('/qa/questions').send({
      "body":"does it work",
      "name":"testuser1",
      "email":"test@test.com",
      "product_id":1
    });

    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
    // expect(res.text).toEqual('helpful updated');
  });


  // test('responds to /hello/:name', async () => {
  //   const res = await request(app).get('/hello/jaxnode');
  //   expect(res.header['content-type']).toBe('text/html; charset=utf-8');
  //   expect(res.statusCode).toBe(200);
  //   expect(res.text).toEqual('hello jaxnode!');
  // });

  // test('responds to /hello/Annie', async () => {
  //   const res = await request(app).get('/hello/Annie');
  //   expect(res.header['content-type']).toBe('text/html; charset=utf-8');
  //   expect(res.statusCode).toBe(200);
  //   expect(res.text).toEqual('hello Annie!');
  // });

});