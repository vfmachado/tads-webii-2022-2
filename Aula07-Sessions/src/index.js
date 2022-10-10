const express = require('express');
const logger = require('./middlewares/logger');
const app = express();

app.use(express.static('public'));

const session = require('express-session');
app.use(session({
    secret: 'SEGREDO DA APLICACAO, SE VAZAR DA RUIM',
    resave: false,  
    saveUninitialized: true,
    // cookie: { secure: true } - FOR PRODUCTION
}));

//if (process.env.NODE_ENV == 'dev')
app.use(logger);

// app.set => utilizar para setar configurações do express
// "view engine" é a chave do express para identificar a template engine
app.set('view engine', 'ejs');  // => ejs é a lib

    // chave do express
app.set('views', 'src/views');  
                // pasta no nosso sistema

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());    // API REST

app.get(`/`, (req, res) => {
    const nick = req.session.nick || req.session.id;
    res.render('home', {
        user: req.session.user,
        nick: nick,
        
    });
});

app.get(`/nick`, (req, res) => {
    req.session.nick = req.query.nick;
    res.redirect(`/`);
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

const userRoutes = require('./routes/user-routes');
app.use('/users', userRoutes);

app.listen(3000, () => {
    console.log("SERVER STARTED AT 3000");
});