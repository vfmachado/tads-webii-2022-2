const isAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.status(403).send(`NAO PODE ACESSAR - nao esta logado`);
    }
    next();
    // if (req.query.key == "CHAVE")
}

module.exports =  isAuth;