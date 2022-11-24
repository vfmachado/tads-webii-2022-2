const axios = require("axios");
const StarWarsApi = axios.create({ 
    baseURL: 'https://swapi.dev/api'    // pode mudar de acordo com o ambiente
});
module.exports = StarWarsApi;
