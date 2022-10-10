const db = require('../database/dbconnection');


class AuthController {
    constructor() {
        console.log('Iniciando o auth controller');
    }

    login(req, res) {  
        console.log('AQUI.. logando')
        // entrada req.params.cpf   // vem do mapeamento da url
        const { email, password } = req.body;

        db.get('SELECT * FROM users WHERE users.email = ? AND users.password = ?', [email, password], (err, user) => {

            if (err) {
                console.log('erro ao buscar o usuario');
                console.log({ err });
                return res.send('ERRO ' + JSON.stringify(err))
            }
            if (user) {
             console.log({ user });
             req.session.user = user;
             if (user.email == `vini@gmail.com`) {
                req.session.user.type = 'ADMIN'
             }
             return res.redirect('/');
            } else {
                return res.redirect('/users/add')
            }
        });

        
    }
}

module.exports = AuthController;