const dir = require("../../rootdir");
const path = require('path');
const { Image } = require("../models/Images");
const uploadToS3 = require("../utils/s3/UploadFile");

class UsersController {
    
    /*
        validar a requisicao
        repassar para a camada de servico
    */
    async list(req, res) {
        return res.json("FUNCIONA");
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
        // repasso para a camada de servico
    }
}

module.exports = { UsersController };