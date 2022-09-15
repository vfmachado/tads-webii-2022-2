const db = require('../database/dbconnection');

users = [
    {
        cpf: '100',
        name: 'Borges'
    },
    {
        cpf: '101',
        name: 'Jean'
    },
    {
        cpf: '102',
        name: 'Matheus'
    },
    {
        cpf: '103',
        name: 'Luiz'
    },
    {
        cpf: '104',
        name: 'Andre'
    },
    {
        cpf: '105',
        name: 'Marcelo'
    },
];


class UserController {
    constructor() {
        console.log('Iniciando o user controller');
    }

    renderAdd(req, res) {
        return res.render('users-insert');
    }

    create(req, res) {
        console.log("userController/create");
        console.log({ body: req.body });

        const { cpf, name, email, password, img_url } = req.body;

        // REGRA DE NEGOCIO: SÓ INSERE SE O CPF NÃO EXISTIR NESSA LISTA
        const existe = users.filter(u => u.cpf == cpf)[0];
        if (existe) {
            return res.send("NAO POSSO CADASTRAR, CPF JA EXISTE");
        }
        const sql = 'INSERT INTO users (name, cpf, email, password, created_at, img_url) VALUES (?, ?, ?, ?, ?, ?)';
        const now = new Date().getTime();
        const params = [
            name, cpf, email, password, now, img_url
        ];
        db.run(sql,  params, (err) => {
            if (err) {
                console.log(err)
                return res.status(500).send(err);
            }
            return res.send("OK...");
        })
        
    }

    delete(req, res) {
        // users/delete/:id
        const { id } = req.params;
        const sql = 'DELETE FROM users WHERE users.id = ?';
        db.run(sql, [id], (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send("ERRO AO EXCLUIR");
            }
            return res.redirect('/users');
        })
    }

    list(req, res) {
        // entrada vazia
        // logica é buscar usuarios
        db.all('SELECT * FROM users', (err, rows) => {
            if (err) {
                console.error(err);
            } else {
                 // resposta
                console.log({ rows });
                res.render('users-list', { users: rows })
            }
        })
        
       
        
    }

    detail(req, res) {  
        // entrada req.params.cpf   // vem do mapeamento da url
        const { id } = req.params;

        // logica é buscar um usuario com o cpf informado, caso nao encontrado, apontar o erro
        // select * from users u where u.cpf = '?'
        
        db.get('SELECT * FROM users WHERE users.id = ?', [id], (err, user) => {
             // resposta a pagina com os detalhes do usuario
            return res.render('users-detail', { user });
        });

        
    }
}

module.exports = UserController;