const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {

  // Antes de cada teste, executo a migraions 
  beforeEach(async () => {
    await connection.migrate.latest();
  });

  //Depois de cada teste, fecho a conexão
  afterAll(async () => {
    await connection.migrate.rollback();
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
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

  });

  it('should be abe to list ONG', async () => {
    const response = await request(app).get('/ongs');
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    expect(response.body.length).toBeLessThan(20);
    //Or for a range of values
    //expect(response.body.length).toBeGreaterThanOrEqual(1);
    // expect(response.body).toBeLessThan(20);

  });


});