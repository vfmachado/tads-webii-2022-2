//IMPORTACAO
const express = require('express');
const path = require('path');
// EXECUCAO DA FUNCAO EXPORTADA DO EXPRESS
// CHAMAMOS DE APP / SERVER
const app = express();

app.use(express.static('public'));

// EXPRESS OLHA AS ROTAS NA ORDEM DE DECLARAÇÃO!!!!!!!!!!!!!
app.get('/', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>Minha página em HTML</h1>
    </body>
    </html>`
    // res.send(html);
    const diretorio = __dirname;
    console.log({diretorio})
    res.sendFile(diretorio + '/htmls/inicial.html');
});


app.get('/downloads/:name', (req, res) => {
    const finalPath = path.join(__dirname, "pdfs", "dummy.pdf");
    res.sendFile(finalPath);
});

app.get('/pagina/*', (req, res) => {

    res.send("OK... da pagina ..." + req.originalUrl);
})

// : indicam o nome de uma variavel dentro da url
app.get('/produto/:cod', (req, res) => {
    res.send("O usuario buscou a pagina do produto de cod " + req.params.cod);
    // const { cod } = req.params;
});

// multiplas variaveis... e combinacao com o *
app.get('/noticia/:ano/:mes/:dia/*', (req, res) => {
    // o que vcs quiserem.
})

// podemos importar rotas de outros lugares
const userRoutes = require('./users/user-routes');
// UTILIZAMOS O USE PARA MAPEAR TODOS OS TIPOS DE CHAMADAS HTTP...
// PODEMOS INCLUIR O INICIO DA URL NESTE MAPEAMENTO
// CASO A URL NÃO COINCIDA, NEM ENTRA =)
app.use('/users', userRoutes);

const animalsRoutes = require('./animals/animals-routes');
app.use('/animals', animalsRoutes);

// * na url é um wildcard (coringa, pega qlqr coisa)
app.get('*', (req, res) => {
    res.status(404).send("NOT FOUND... o express nao encontrou nenhuma rota para a URL especificada");
})

// DÁ O START NO SERVER NA PORTA INDICADA
// FUNCAO DE CALLBACK É EXECUTADA DEPOIS QUE O SERVER EXECUTOU
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`SUCCESSFULLY STARTED AT ${PORT}`);
});