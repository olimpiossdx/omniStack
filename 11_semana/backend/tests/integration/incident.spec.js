const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Incident', () => {
  // Antes de cada teste, executo a migraions 
  beforeEach(async () => {
    await connection.migrate.latest();
  });

  //Depois de cada teste, fecho a conexão
  afterAll(async () => {
    await connection.migrate.rollback();
    await connection.destroy();
  });

  it('not should be able to create a new Incident(authorization)', async () => {
    const response = await request(app)
      .post('/incidents')
      .send({
        title: "caso 16",
        description: "Detalhes do caso",
        value: 260
      });
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('"authorization" is required');
  });


  it('not should be able to create a new Incident(title)', async () => {
    const createResponse = await request(app)
      .post('/ongs')
      .send({
        name: "APAD10",
        email: "contato@apad10.com.br",
        whatsapp: "4100000000",
        city: "Rio do Norte",
        uf: "SC"
      });

    const { id } = createResponse.body;

    const responseIncident = await request(app)
      .post('/incidents')
      .set('authorization', id)
      .send({
        description: "Detalhes do caso",
        value: 260
      });

    expect(responseIncident.body).toHaveProperty('message');
    expect(responseIncident.body.message).toBe('"title" is required');
  });


  it('not should be able to create a new Incident(description)', async () => {
    const createResponse = await request(app)
      .post('/ongs')
      .send({
        name: "APAD11",
        email: "contato@apad11.com.br",
        whatsapp: "4110000000",
        city: "Rio do Norte",
        uf: "SC"
      });

    const { id } = createResponse.body;

    const responseIncident = await request(app)
      .post('/incidents')
      .set('authorization', id)
      .send({
        title: "caso 16",
        value: 260
      });

    expect(responseIncident.body).toHaveProperty('message');
    expect(responseIncident.body.message).toBe('"description" is required');
  });

  it('not should be able to create a new Incident(value)', async () => {
    const createResponse = await request(app)
      .post('/ongs')
      .send({
        name: "APAD5",
        email: "contato@apad5.com.br",
        whatsapp: "4800000000",
        city: "Rio do Norte",
        uf: "SC"
      });

    const { id } = createResponse.body;

    const responseIncident = await request(app)
      .post('/incidents')
      .set('authorization', id)
      .send({
        title: "caso 16",
        description: "Detalhes do caso",
      });

    expect(responseIncident.body).toHaveProperty('message');
    expect(responseIncident.body.message).toBe('"value" is required');
  });

  it('should be abe to list Incident', async () => {
    const createResponse = await request(app)
      .post('/ongs')
      .send({
        name: "APAD5",
        email: "contato@apad5.com.br",
        whatsapp: "4800000000",
        city: "Rio do Norte",
        uf: "SC"
      });

    const { id } = createResponse.body;
    await request(app).post('/incidents').set('authorization', id)
      .send({
        title: "caso 16",
        description: "Detalhes do caso",
        value: 260
      });

    const response = await request(app).get('/incidents')

    expect(response.body.length).toBeGreaterThanOrEqual(1);
    expect(response.body.length).toBeLessThan(20);
  });

});