const syncDb = require('./models/sync');

// const { User } = require('./models/User');
// User.findAll().then(users => { users.forEach(user => { console.log(user.name); }); });

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

app.get(`/sql`, async (req, res) => {
    // const vini = await User.findByPk(
    //     req.query.userId, 
    //     { include: { all: true, nested: true }})

    const vini = await User.findByPk(req.query.userId, {
        include: [{
            model: Post,
            include: [
                {model: Commentary,
                include: User}
            ]
        }]
    });

    const vini2 = await User.findByPk(req.query.userId);
    const posts = await Post.findAll({ 
        where: {
           userId: vini2.id
        },
    })

    return res.json(posts);
});

const userRoutes = require('./routes/user-routes');
const { User } = require('./models/User');
const { Post } = require('./models/Post');
const sequelize = require('./database/sequelize-connection');
const { Commentary } = require('./models/Commentary');
app.use('/users', userRoutes);

app.listen(3000, () => {
    console.log("SERVER STARTED AT 3000");
});