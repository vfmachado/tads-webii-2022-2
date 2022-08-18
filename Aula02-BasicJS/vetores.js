const names = [
    "Vini", "Henrique", "Matheus", "Borges", "Jean", "Andre", "Guilherme", "Luiz", "Adriano", "Marcelo", "Lais"
];

names.push("ADICIONANDO NA LISTA");


// VERIFICAR SE EXISTE A OCORRENCIA DE UM NOME NA LISTA
console.log(names.indexOf("ESTE CERTAMENTE NAO ESTA"));
console.log(names.includes("Henrique"));
// names.findIndex();

const meusObjs = [
    {
        id: 1,
        name: "Primeiro"
    },
    {
        id: 2  ,
        name: "Segundo"
    },
    {
        id: 3,
        name: "Terceiro"
    }
]

console.log(meusObjs.indexOf({
    id: 1, name: "Primeiro"
}))

let idx0 = meusObjs[0];
console.log(meusObjs.indexOf(idx0))

console.log(meusObjs.findIndex(obj => obj.id == 1));

const pessoas = names.map(valorAtual => ({
    name: valorAtual,
    curso: 'TADS'
}));

console.log(JSON.stringify(pessoas, null, 2))
console.log({names});


function mostraNome (nome) {
    console.log( "FUNCAO MOSTRA NOME COM PARAM " + nome)
}

const mostraNome2 = nome => console.log( "FUNCAO MOSTRA NOME COM PARAM em ARROW " + nome)

names.forEach(mostraNome)
names.forEach(mostraNome2)