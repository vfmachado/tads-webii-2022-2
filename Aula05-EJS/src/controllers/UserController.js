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

        const { cpf, name } = req.body;

        // REGRA DE NEGOCIO: SÓ INSERE SE O CPF NÃO EXISTIR NESSA LISTA
        const existe = users.filter(u => u.cpf == cpf)[0];
        if (existe) {
            return res.send("NAO POSSO CADASTRAR, CPF JA EXISTE");
        }

        users.push({
            cpf, name
        })

        return res.send("OK..");
    }

    list(req, res) {
        // entrada vazia
        // logica é buscar usuarios
        
        // resposta
        res.render('users-list', { users })
    }

    detail(req, res) {  
        // entrada req.params.cpf   // vem do mapeamento da url
        const { cpf } = req.params;

        // logica é buscar um usuario com o cpf informado, caso nao encontrado, apontar o erro
        // select * from users u where u.cpf = '?'
        const user = users.filter(u => u.cpf == cpf)[0];
        if (!user) {
            return res.send("USUARIO NAO ENCONTRADO");
        }

        // resposta a pagina com os detalhes do usuario
        return res.render('detail-user', { user: user });
        
    }
}

module.exports = UserController;