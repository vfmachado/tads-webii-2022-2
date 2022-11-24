const dir = require("../../rootdir");
const path = require('path');
const { Image } = require("../models/Images");
const uploadToS3 = require("../utils/s3/UploadFile");

const axios = require('axios');
const StarWarsApi = require("../utils/starwars/star-api");
const RandomStarWarsName = require("../utils/starwars/random-name");
const { User } = require("../models/User");
const validateUserDto = require("../validators/user-validator");

class UsersController {
    
    /*
        validar a requisicao
        repassar para a camada de servico
    */
    async list(req, res) {
        return res.json("FUNCIONA");
    }

    async age(req, res) {
        const { name } = req.query;

        if (!name) {
            return res.status(404).json("Missing query parameter name");
        }

        try {
            const newName = await RandomStarWarsName();
            const response = await axios.get(`https://api.agify.io?name=${name}`);
            
            // ... => spread operator, destrutura o objeto (desmonta o objeto dentro de outro)
            return res.json({ msg: 'retorno do meu backend', number, ...response.data, name: newName});
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async addImage(req, res) {
        const data = {
            body: req.body,
            file: req.file
        }

        Image.create({
            UserId: req.body.user,
            title: req.body.title,
            url: req.file.filename
        });

        const file = path.join(dir, 'uploads', req.file.filename);
        console.log({ file })
        const location = await uploadToS3(file, req.file.filename)

        return res.json({data, location});
    }

    async detail(req, res) {
        // usuarios tem um id, numerico...
    }

    async create(req, res) {
        /// validar que os dados do usuário chegaram corretamente
        const { name, email, password, cpf } = req.body;

        // nome tem que ter mais de 3 caracteres e deve ser enviado um sobrenome.
        // email tem que ter um @ e um ponto pós arroba, pelo menos 3 caracteres antes do arroba
        // password, 8 caracteres minimos, com letras minusculas, maiusculas, numero, caractere especial
        // e o cpf é o cpf, 11 caracteres, tem que validar usando aquela regrinha.

        const userDto = {
            name, email, password, cpf
        }

        const error = validateUserDto(userDto);
        if (error) {
            return res.status(400).json(error);
        }

        try {
            await User.create(userDto)
            return res.status(201).json();
        } catch (error) {
            return res.status(500).json("ERRO AO CRIAR USUÁRIO");
        }

    }

}

module.exports = { UsersController };