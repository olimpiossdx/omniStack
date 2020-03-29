const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('sessions', () => {

  // Antes de cada teste, executo a migraions 
  beforeEach(async () => {
    await connection.migrate.latest();
  });

  //Depois de cada teste, fecho a conexão
  afterAll(async () => {
    await connection.migrate.rollback();
    await connection.destroy();
  });

  it('not should be able to find session', async () => {
    const response = await request(app).post('/sessions');

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('"id" is required');
  });

  it('should be able to find session', async () => {

    const responseCreteOng = await request(app)
      .post('/ongs')
      .send({
        name: "APAD5",
        email: "contato@apad5.com.br",
        whatsapp: "4800000000",
        city: "Rio do Norte",
        uf: "SC"
      });

    const { id } = responseCreteOng.body;

    const response = await request(app).post('/sessions').send({ id: id });

    expect(response.body).toHaveProperty('name');
  });

});