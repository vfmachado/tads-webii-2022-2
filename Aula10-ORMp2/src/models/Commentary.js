const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize-connection");

const Commentary = sequelize.define('Commentary', {
  text: DataTypes.STRING
}, {
  modelName: 'commentaries'
});


module.exports = { Commentary };