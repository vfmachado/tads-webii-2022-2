// sortear um numero que represetará um personagem do star wars 
// entre 1 e 82
// https://swapi.dev/api/people/NUMERO

const RandomStarWarsName = async () => {
    const number = Math.floor(Math.random() * 82);
    const starResponse = await StarWarsApi.get(`people/${number}`);
    return starResponse.data.name;
}

module.exports = RandomStarWarsName;