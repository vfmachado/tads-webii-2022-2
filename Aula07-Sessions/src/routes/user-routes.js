const { Router } = require('express');
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const router = Router();

const controller = new UserController();
const authController = new AuthController();

const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

router.post('/auth', (req, res) => authController.login(req, res));

router.get('/add', (req, res) => controller.renderAdd(req, res));

router.get('/:id', (req, res) => controller.detail(req, res));

router.get('/', isAuth, isAdmin,  (req, res) => controller.list(req, res));

router.get('/delete/:id', (req, res) => controller.delete(req, res));

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