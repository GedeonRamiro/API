const express = require("express");
const router = express.Router();
const Game = require("./Game");
const auth = require("../middleware/auth");
const generateId = require("../libs/generateId");

const LIMITE_GAME_PAGE = 5;

router.get("/games", auth, async (req, res) => {
  const games = await Game.findAll({
    raw: true,
    order: [["createdAt", "DESC"]],
  });

  res.json(games);
  res.statusCode = 200;
});

router.get("/games/page/:num", async (req, res) => {
  const page = req.params.num;

  console.log(page);

  let offset = 0;

  if (isNaN(page) || page === 1) {
    offset = 0;
  } else {
    offset = (Number(page) - 1) * LIMITE_GAME_PAGE;
  }

  const games = await Game.findAndCountAll({
    limit: LIMITE_GAME_PAGE,
    offset: offset,
    raw: true,
    order: [["createdAt", "DESC"]],
  });

  let next;
  if (offset + LIMITE_GAME_PAGE >= games.count) {
    next = false;
  } else {
    next = Number(page) + 1;
  }

  let prev;
  if (Number(page) === 1 || games.rows.length === 0) {
    prev = false;
  } else {
    prev = page - 1;
  }

  const toatalPage = Math.ceil(games.count / LIMITE_GAME_PAGE);

  var result = {
    page: parseInt(page),
    prev: prev,
    next: next,
    totalPage: toatalPage,
    games: games,
  };

  res.json({ result });
});

router.get("/game/:id", async (req, res) => {
  const id = req.params.id;

  const game = await Game.findOne({
    where: { id: id },
  });

  if (!game) {
    return res.status(404), res.json({ message: "Game não encrontrado!" });
  }

  res.statusCode = 200;
  res.json(game);
});

router.post("/game", async (req, res) => {
  const { name, year, price } = req.body;

  if (name === undefined || year === undefined || price === undefined) {
    return res.status(400), res.json({ message: "Preencha todos os campos!" });
  }

  if (name === "" || year === "" || price === "") {
    return res.status(400), res.json({ message: "Preencha todos os campos!" });
  }

  try {
    await Game.create({
      id: generateId(),
      name,
      year,
      price,
    });

    res.status(200);
    res.json({ message: "Game criado com sucesso!" });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/game/:id", async (req, res) => {
  const id = req.params.id;

  const game = await Game.destroy({
    where: { id: id },
  });

  if (!game) return res.status(404);

  res.status(200);
  res.json({ message: "Game excluído com sucesso!" });
});

router.put("/game/:id", async (req, res) => {
  const id = req.params.id;
  const { name, year, price } = req.body;

  const gameId = await Game.findOne({
    where: { id: id },
  });

  if (!gameId) return res.status(404);

  await Game.update(
    { name: name, year: year, price: price },
    {
      where: { id: id },
    }
  );

  res.status(200);
  res.json({ message: "Game editado com sucesso!" });
});

module.exports = router;
