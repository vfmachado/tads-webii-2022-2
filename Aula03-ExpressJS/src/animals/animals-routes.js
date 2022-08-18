const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    const { specie } = req.params;
    res.send(`Pagina com a lista de especies`)
});

router.get('/:specie', (req, res) => {
    const { specie } = req.params;
    res.send(`Pagina do animal ${specie}`)
});

router.get('/sound/:specie', (req, res) => {
    res.send(`Som que uma espécie faz`)
})

module.exports = router;