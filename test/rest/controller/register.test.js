require('dotenv').config();
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../../../app'); // importa o app.js

describe('POST /users/register', function() {
  it('deve registrar um usuário com sucesso', async function() {
    const res = await request(app)
      .post('/users/register')
      .send({
        username: 'jacytest',
        password: '123456',
        favorecidos: ['amigo1', 'amigo2']
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('username', 'jacytest');
    expect(res.body).to.have.property('favorecidos').that.includes('amigo1');
  });

  it('não deve registrar usuário duplicado', async function() {
  const res = await request(app)
    .post('/users/register')
    .send({
      username: 'jacytest',
      password: '123456',
      favorecidos: ['amigo1']
    });

  expect(res.status).to.equal(400);
  expect(res.body).to.have.property('error', 'Usuário já existe'); // ✅ corrigido
});
  it('deve falhar se faltar username ou password', async function() {
    const res = await request(app)
      .post('/users/register')
      .send({
        password: '123456'
      });

    expect(res.status).to.equal(400);
  });
});
