class UsersController {
    
    /*
        validar a requisicao
        repassar para a camada de servico
    */
    async list(req, res) {
        return res.json("FUNCIONA");
    }

    async detail(req, res) {
        // usuarios tem um id, numerico...
    }

    async create(req, res) {
        /// validar que os dados do usuário chegaram corretamente
        // repasso para a camada de servico
    }
}

module.exports = { UsersController };