const { json } = require('express');
const express = require('express');

const app = express();
app.use(express.json());

// O USUARIO PODE ACESSAR TODOS OS PRODUTOS COMO CLIENTE
    // LISTAR PRODS
    // DETALHAR UM PRODUTOS

// PERFIS DE USUARIO ADMIN / MODERADOR / VENDEDOR / CLIENTE, OUTROS...
// CADA PERFIL TEM UMA LISTA DE PERMISSOES
// CADA PERMISSAO DA ACESSO A UM TIPO DE RECURSO
// LISTAR USUARIOS, REMOVER POST, VER PROFILE D
// QUALQUER USUARIO PODE VER SEU PROPRIO PROFILE

const profiles = [
    {
        name: "ADMIN",
    },
    {
        name: "MODERATOR",
        permissions: ["USER_LIST"]
    },
    {
        name: "CLIENT",
        permissions: []
    }
];

const users = [
    {
        id: 1,
        name: "ADMIN",
        profile: "ADMIN"
    }
];

const getUser = (id) => {
    return users.filter((u) => u.id == id)[0];
}

const getProfilePermissions = (name) => {
    return profiles.filter((p) => p.name == name)[0].permissions;
}

const haskey = (req, res, next) => {
    const key = req.headers['meu-id'];
    console.log("MANDOU O KEY "  + key);
    if (key) return next();

    return res.status(403).json({ msg: "sem chave" });
}

const hasPermission = (req, res, next) => {
    console.log('verificando quem esta requisitando tem permissao');
    const key = req.headers['meu-id'];

    let user = getUser(key);
    if (user.profile == 'ADMIN') return next();

    return res.status(403).json({msg: 'not allowed'});
}

const hasPermissionParam = (permission) => {
    console.log("VERIFICANDO SE TEM A PERMISSAO " + permission);
    
    // retorno um middleware
    return function(req, res, next) {
        console.log(req.headers['meu-id']);
        const userId = req.headers['meu-id'];
        
        let user = getUser(userId);
        if (user.profile == 'ADMIN') return next();
        
        const listaPermissoes = getProfilePermissions(user.profile);
        if (listaPermissoes.includes(permission)) {
            req.meuDadoQualquer = 'blablabla'        
            return next();
        }
        return res.status(403).json({ msg: "vc nao tem a permissao " + permission });
    }
};



app.get('/users', haskey, hasPermissionParam('USER_LIST'), (req, res) => {
    // select no banco
    console.log(req.meuDadoQualquer);
    return res.json(users);
});

app.post('/users', (req, res) => {
    // simulando um insert..
    let id = users[users.length-1].id + 1;
    let profile = 'CLIENT';

    users.push({
        id,
        name: req.body.name,
        profile
    });
    return res.json(users);
});

app.post('/users/:id', haskey, hasPermissionParam("USER_UPDATE"), (req, res) => {
    const id = req.params.id;
    let user = getUser(id);
    user.profile = req.body.profile;
    return res.json();
});

app.post('/permissions', haskey, hasPermission, (req, res) => {
    const profile = profiles.filter(p => p.name == req.body.name)[0];
    profile.permissions.push(req.body.permission);
    return res.json();
})

app.listen(3000);