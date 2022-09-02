const express = require("express");
const router = express.Router();
const User = require("./User");
const jwt = require("jsonwebtoken");
const JWTSecret = require("../token/JWTSecret");
const bcrypt = require("bcryptjs");

router.post("/login", async (req, res) => {
  const { email, password, name } = req.body;

  if (email === undefined || password === undefined) {
    return res.status(400), res.json({ message: "Preencha todos os campos!" });
  }

  if (email === "" || password === "") {
    return res.status(400), res.json({ message: "Preencha todos os campos!" });
  }

  const user = await User.findOne({
    where: { email: email },
  });

  if (!user) {
    return (
      res.status(404),
      res.json({ message: "Email não existe na base de dados!" })
    );
  }
  const correctPassword = bcrypt.compareSync(password, user.password);
  console.log("correctPassword:", correctPassword);

  if (!correctPassword) {
    return res.status(401), res.json({ message: "Credenciais invalidas!" });
  }

  jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWTSecret,
    { expiresIn: "48h" },
    (err, token) => {
      if (err) {
        return res.status(400), res.json({ message: "Falha interna!" });
      }
      res.status(200),
        res.json({
          token: token,
          user: { id: user.id, email: user.email, name: user.name },
        });
    }
  );
});

router.post("/createAccount", async (req, res) => {
  const { name, email, password } = req.body;

  if (name === undefined || email === undefined || password === undefined) {
    return res.status(400), res.json({ message: "Preencha todos os campos!" });
  }

  if (name === "" || email === "" || password === "") {
    return res.status(400), res.json({ message: "Preencha todos os campos!" });
  }

  const hasUser = await User.findOne({ where: { email: email } });
  if (hasUser)
    return (
      res.status(403),
      res.json({ message: "Já existe um usuário com esse email!" })
    );

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  try {
    await User.create({
      name,
      email,
      password: hash,
    });

    res.status(200);
    res.json({ message: "Usuário criado com suceso!" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
