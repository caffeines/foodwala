/* eslint-disable */

const request = require('supertest');
const app = require('../app');
const knex = require('../lib/knexhelper').getKnexInstance();
const userDao = require('../dao/user');

const postEnter = async (data) => {
  const res = await request(app)
    .post('/api/auth/register')
    .send(data)
    .set('Accept', 'application/json');
  return res;
}

describe('POST /api/auth/enter',() => {
  const User = new userDao(knex);
  it('should return status 200 with valid user data', async () => {
    await User.removeAll();
    const res = await postEnter({
      username: "sadat.talks@gmail.com",
      password: "sadat@642",
      address: "Dhaka, Bangladesh",
      name: "Abu Sadat Md. Sayem"
    });
    expect(res.statusCode).toBe(200);
  });
});
