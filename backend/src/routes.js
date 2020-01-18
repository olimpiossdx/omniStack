const { Router } = require('express');
const DevController = require('./controllers/DevController')
const routes = Router();

routes.get('/', (request, response) => {
    return response.json({ message: 'servidor funcionando corretamente na porta 3333' });
});

routes.post('/devs', DevController.store);

module.exports = routes;
