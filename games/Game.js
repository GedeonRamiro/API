const Sequelize = require("sequelize");
const connection = require("../database/database");

const Game = connection.define("games", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

//Game.sync({ force: true });

module.exports = Game;
