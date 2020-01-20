
const express = require('express');
const mongooseDB = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();


mongooseDB.connect('mongodb+srv://jujestack:jujerlei@cluster0-wpp59.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

// Tipos de parãmetros:

// Query Params: visiveis na url (Filtros, ordenação, paginação, ...), acessíveis pela request.query (requisição).
// Route Params: utilizado para identificar recursos em alteração ou remoção (exemplo: http://meusiste.com.br/users/:id), acessíveis pela request.params.
// Body : utilizados para criar ou alterar dados de um registro (formato JSON), acessíveis por request.body 

//utilizando MongoDB para gravar os dados da aplicação, por hospedagem 

app.listen(3333);


