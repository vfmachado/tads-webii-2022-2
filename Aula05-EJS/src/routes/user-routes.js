const { Router } = require('express');
const UserController = require('../controllers/UserController');
const router = Router();

const controller = new UserController();

router.get('/add', (req, res) => controller.renderAdd(req, res));

router.get('/:cpf', (req, res) => controller.detail(req, res));

router.get('/', (req, res) => controller.list(req, res));

router.post('/', 
(req, res, next) => {
    console.log("MEU MIDDLEWARE 1...");
    next();
},
(req, res, next) => {
    console.log("MEU MIDDLEWARE 2...");
    // if (5 > 2) return res.send("SRY NAO PODE");
    next();
},
(req, res) => controller.create(req, res));

module.exports = router;