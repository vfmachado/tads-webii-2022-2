const soma = (a, b) => a + b;

let a = 10;
let b = 15;
let c = a > b ? a : b;


function fnSoma(a, b) {
    return a + b;
}

/*
var
let
const
*/

// console.log(exVar);      // => undefined
// var exVar = "ESSA EH MINHA VAR";
// console.log(exVar);      // => o texto...

// console.log(exLet); => gera erro
let exLet = "ESSE EH MEU LET";
console.log(exLet);


const inalteravel = "TEXTO QLQR.";
// inalteravel = "QLQR OUTRA COISA"; // gera erro

const obj = {
    valor: 10
}
// isso da certo
obj.valor = 20;

const texto = "Meu texto";
console.log(texto);
const uptext = t => {
    t = "MEU NOVO TEXTO";
    console.log("Dentro do escopo " + t)
}
uptext(texto);
console.log(typeof(texto))
console.log(texto);
