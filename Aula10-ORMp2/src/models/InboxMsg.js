const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize-connection");

const Inbox = sequelize.define('Inbox', {
  text: DataTypes.STRING,
  sender: DataTypes.INTEGER,
  receiver: DataTypes.INTEGER
}, {
  modelName: 'inbox'
});


module.exports = { Inbox };