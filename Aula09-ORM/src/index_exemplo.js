const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite'
});


const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
});


sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    // sequelize.sync({ force: true });
    sequelize.sync();

    // SELECT * FROM USERS
    User.findAll().then(users => {
      // console.log(users);
      users.forEach(user => {
        console.log(user.name);
      });
    });

    User.findByPk(1).then(user => {
      // console.log(user);
      user.name = "Vinicius Fritzen";
      user.save();  // update nessa linha
    });

    // INSERINDO UM DADO
    //const dadosUser = req.body;
    // User.create(dadosUser);
    User.create({
      name: "Theo",
      email: "theo@gmail.com",
      password: "123456"
    });

    // DELETANDO UM DADO
    // User.destroy({
    //   where: {
    //     id: 3
    //   }
    // });


  })
  .catch(error => {
    console.log('Unable to connect to the database:', error);
  });

