const { User } = require("../../models/User");

module.exports = async () => {
    return User.findAll();
}
