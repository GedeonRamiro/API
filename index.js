const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const cors = require("cors");

app.use(cors());

const gamesController = require("./games/GamesController");
const usersController = require("./users/UsersController");

const Game = require("./games/Game");
const User = require("./users/User");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connection
  .authenticate()
  .then(() => {
    console.log("Conexão com banco feita com suceso!");
  })
  .catch((erro) => {
    console.log("erro no banco");
  });

app.use("/", gamesController);
app.use("/", usersController);
app.use("/image", express.static("./image"));

app.listen(8080, () => {
  console.log("API Rodando!");
});
