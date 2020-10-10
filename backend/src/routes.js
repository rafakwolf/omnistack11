const express = require('express');
const OngController = require('./controllers/OngController');
const CasosController = require('./controllers/CasoController');

const routes = express.Router();

routes.get('/', (_request, response) => {
    return response.json({
        status: 'ok'
    });
});

routes.get('/ongs', OngController.list);
routes.post('/ongs', OngController.create);

routes.get('/casos', CasosController.list);
routes.post('/casos', CasosController.create);
routes.delete('/casos/:id', CasosController.delete);

module.exports = routes;