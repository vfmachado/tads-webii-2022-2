const express = require('express');
const app = express();

const { UsersController } = require('./controllers/UsersController');

const usersController = new UsersController();

app.get('/users', (req, res) => usersController.list(req, res));

app.listen(3000);