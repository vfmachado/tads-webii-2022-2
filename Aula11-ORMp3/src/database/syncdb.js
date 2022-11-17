const sequelize = require("./sequelize-connection");

const { Image } = require("../models/Images");
const { User } = require("../models/User");

User.hasMany(Image);
Image.belongsTo(User);

sequelize.sync();
