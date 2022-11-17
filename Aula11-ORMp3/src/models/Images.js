const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize-connection");

const Image = sequelize.define('Image', {
  title: DataTypes.STRING,
  url: DataTypes.STRING,
}, {
  modelName: 'images'
});

module.exports = { Image };