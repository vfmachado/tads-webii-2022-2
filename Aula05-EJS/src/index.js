const express = require('express');
const app = express();

app.use(express.static('public'));

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
    res.render('home', {
        user: "FULANO"
    });
});

const userRoutes = require('./routes/user-routes');
app.use('/users', userRoutes);

app.listen(3000, () => {
    console.log("SERVER STARTED AT 3000");
});