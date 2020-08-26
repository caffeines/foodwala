/* eslint-disable */

const request = require('supertest');
const app = require('../app');
const knex = require('../lib/knexhelper').getKnexInstance();
const userDao = require('../dao/user');
const errorCode = require('../constant/errorCode');

const register = async (data) => {
  const res = await request(app)
    .post('/api/auth/register')
    .send(data)
    .set('Accept', 'application/json');
  return res;
}

const verifyEmail = async ({ username, token }) => {
  const res = await request(app)
    .get(`/api/auth/verify-email?username=${username}&token=${token}`)
    .set('Accept', 'application/json');
  return res;
}

describe('POST /api/auth/enter',() => {
  const User = new userDao(knex);
  it('should return status 400 with invalid email', async () => {
    await User.removeAll();
    const res = await register({
      username: "sadat.talksgmail.com",
      password: "sadat@642",
      address: "Dhaka, Bangladesh",
      name: "Abu Sadat Md. Sayem"
    });    
    expect(res.statusCode).toBe(400);
  });
  it('should return status 400 with invalid name', async () => {
    const res = await register({
      username: "sadat.talks@gmail.com",
      password: "sadat@642",
      address: "Dhaka, Bangladesh",
      name: "Ab"
    });    
    expect(res.statusCode).toBe(400);
  });
  it('should return status 400 with invalid password', async () => {
    const res = await register({
      username: "sadat.talks@gmail.com",
      password: "sada",
      address: "Dhaka, Bangladesh",
      name: "Abu Sadat Md. Sayem"
    });    
    expect(res.statusCode).toBe(400);
  });
  it('should return status 400 with empty address', async () => {
    const res = await register({
      username: "sadat.talksgmail.com",
      password: "sadat@642",
      address: "",
      name: "Abu Sadat Md. Sayem"
    });    
    expect(res.statusCode).toBe(400);
  });
  it('should return status 200 with valid user data', async () => {
    const res = await register({
      username: "sadat.talks@gmail.com",
      password: "sadat@642",
      address: "Dhaka, Bangladesh",
      name: "Abu Sadat Md. Sayem"
    });
    expect(res.statusCode).toBe(200);
  });
  it('should return status 400 with unverified email or username', async () => {
    const res = await register({
      username: "sadat.talks@gmail.com",
      password: "sadat@642",
      address: "Dhaka, Bangladesh",
      name: "Abu Sadat Md. Sayem"
    });    
    expect(res.statusCode).toBe(400);
    expect(res.body.code).toBe(errorCode.USER_EMAIL_NOT_VERIFIED);
  });
  it('should return status 409 with existing email or username', async () => {
    const res = await register({
      username: "sadat.sayem@gmail.com",
      password: "sadat@642",
      address: "Dhaka, Bangladesh",
      name: "Abu Sadat Md. Sayem"
    });
    expect(res.statusCode).toBe(200);
  });
});

describe('GET /api/auth/verify-email',() => {
  it('should return status 400 for invalid email', async()=> {
    const res = await verifyEmail({
      username: 'sadat@gmail.com', token: '7aXZas8SaVZ'
    });
    expect(res.statusCode).toBe(404);
  });

  it('should return status 404 for unknown email', async()=> {
    const res = await verifyEmail({
      username: 'sadatgmail.com', token: '7aXZas8SaVZ'
    });
    expect(res.statusCode).toBe(400);
  });

  it('should return status 401 for invalid verification code', async()=> {
    const res = await verifyEmail({
      username: 'sadat.talks@gmail.com', token: '7aXZas8SaVZ'
    });
    expect(res.statusCode).toBe(401);
    expect(res.body.code).toBe(errorCode.VERIFICATION_CODE_NOT_MATCH);
  });
  it('should return status 401 for invalid verification code', async()=> {
    const User = new userDao(knex);
    const user = {
      username: 's@gmail.com',
      name: "Sadat",
      password: '123456788',
      address: 'Dhaka'
    }
    const createdUser = await User.createUser(user);
    const res = await verifyEmail({
      username: createdUser.username, token: createdUser.verificationCode
    });
    expect(res.statusCode).toBe(200);
  });
  
})