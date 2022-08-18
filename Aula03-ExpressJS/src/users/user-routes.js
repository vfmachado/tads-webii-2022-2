    const { Router } = require('express');
    const router = Router();

    router.get('/:username', (req, res) => {
        const { username } = req.params;
        res.send(`Pagina do profile ${username}`)
    });

    router.get('/:username/comments', (req, res) => {
        res.send("Comentarios de um usuario qlqr...")
    });

    router.post('/create', (req, res) => {
        console.log(`criaria um usuario`);
        res.send('Fingi que criei..');
    })

    module.exports = router;