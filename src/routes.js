const express = require('express');
const ProdutoController = require('./controllers/ProdutoController.js');
const UserController = require('./controllers/UserController.js');
const authController = require('./controllers/authController.js');
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();


routes.post('/login',authController.Autenticacao);
routes.use(authMiddleware);

routes.delete('/produto/excluir/:proId', ProdutoController.delete)
routes.get('/lista',ProdutoController.index);
routes.post('/produto', ProdutoController.store);
routes.post('/retirar/produto/:proId', ProdutoController.alter);
routes.post('/novo/usuario',UserController.newUser);
module.exports = routes;