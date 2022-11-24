const dotenv = require('dotenv');
dotenv.config({
    path: process.env.NODE == 'PROD' ? '.env.prod' : '.env'
});

console.log({ mode: process.env.MODE });

const sync = require('./database/syncdb');

const express = require('express');
const app = express();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.use(express.urlencoded());
app.use(express.json());

app.use(express.static('uploads'));

const { UsersController } = require('./controllers/UsersController');

const usersController = new UsersController();

app.post('/users', (req, res) => usersController.create(req, res));
app.get('/users', (req, res) => usersController.list(req, res));

app.get('/age', (req, res) => usersController.age(req, res));

app.post('/image', 
upload.single('image'),
(req, res) => usersController.addImage(req, res));

app.listen(3000);