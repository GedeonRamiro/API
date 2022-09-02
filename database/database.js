const Sequelize = require("sequelize");
require("dotenv").config();

const connection = new Sequelize("apigames", "root", `${process.env.DB_USER}`, {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00",
});

module.exports = connection;
