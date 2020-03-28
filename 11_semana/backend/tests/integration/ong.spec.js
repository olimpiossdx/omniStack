const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {

  // Antes de cada teste, executo a migraions 
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  //Depois de cada teste, fecho a conexão
  afterAll(async () => {
    await connection.destroy();
  });

  it('should be albe to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      //set('Authorization','asda') 
      .send({
        name: "APAD5",
        email: "contato@apad5.com.br",
        whatsapp: "4800000000",
        city: "Rio do Norte",
        uf: "SC"
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);

  })

});