const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/', (request, response) => {
    return response.json({ message: 'servidor funcionando corretamente na porta 3333' });
});

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);

routes.get('/search', SearchController.index);

module.exports = routes;
