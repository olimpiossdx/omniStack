const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('profiles', () => {

  // Antes de cada teste, executo a migraions 
  beforeEach(async () => {
    await connection.migrate.latest();
  });

  //Depois de cada teste, fecho a conexão
  afterAll(async () => {
    await connection.migrate.rollback();
    await connection.destroy();
  });


  it('not should be abe to list profile', async () => {
    const response = await request(app).get('/profile');

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('"authorization" is required');
  });


  it('should be abe to list profile', async () => {

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

    const response = await request(app).get('/profile').set('authorization', id);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
    expect(response.body.length).toBeLessThan(20);

  });


});