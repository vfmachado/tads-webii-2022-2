const http = require('http');

function webReqRes(req, res) {}
                // http.createServer(webReqRes);
const server = http.createServer((req, res) => {
    console.log("CHEGOU UMA REQUISICAO")
    console.log({ req });
    res.end(`Hello, World!\n`);
});

server.listen(3000);
