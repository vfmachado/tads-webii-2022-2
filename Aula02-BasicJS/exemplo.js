console.log("Hello World.. isto funciona..");

const exHobby = {
    description: '',
    startedAt: 2021
}

class User {
    constructor(username, password) {
        this.id = '123';
        this.username = username;
        this.password = password;
        this.hobbies = [];
    }

    // get & set ... normalmente nao utilizamos
    
    // methods

    // add hobby
    addHobby(hobby) {
        this.hobbies.push(hobby)
    }

    removeHobby(hobby) {

    }

    describe() {
        return `The user "${this.username}"
            has an ID ${this.id}
            hobbies: \n${JSON.stringify(this.hobbies, null, 2)}`;
    }
}

const user = new User('vini', '1234');

user.addHobby({
    description: 'GAMING',
    startedAt: 1996
});

user.addHobby({
    description: 'MUSIC',
    startedAt: 2003
});

user.addHobby({
    description: 'SKATE',
    startedAt: 2005
});


user.addHobby({
    description: 'SKATE',
    startedAt: 2007
});

user.addHobby({
    description: 'CODING',
    startedAt: 2008
});

user.addHobby({
    description: 'DRAWING',
    startedAt: 2020
});


// console.log(user.describe());

let recents = user.hobbies.filter(e => e.startedAt > 2005)



// console.log(user.describe());

const update = (array) => {
    array[0].description = "ALO ALO";
}

update(recents);

console.log(JSON.stringify(recents, null, 2));
console.log(typeof(recents[0]))

const names = [
    "Vini", "Henrique", "Matheus", "Borges", "Jean", "Andre", "Guilherme", "Luiz", "Adriano", "Marcelo", "Lais"
];

// ordenacao O nlogn
names.sort();

console.log({names})

const preferencias = {
    "filme": "MARVEL",
    "jogos": "THE WITCHER",
    "sport": "skate"
}

console.log({preferencias});

// CUIDADO COM ARITMETICA, NAO É O QUE PARECE
let texto = 0.1;
let b = 0.2;
let c = texto + b;
console.log({a: texto, b, c})
console.log(c == 0.3);


