const express = require("express");
const router = express.Router();
const Game = require("./Game");
const auth = require("../middleware/auth");
const generateId = require("../libs/generateId");
const uploadImage = require("../middleware/uploadImage");
const deleteImage = require("../utils/deleteImage");

const LIMITE_GAME_PAGE = 5;

router.get("/games", async (req, res) => {
  const games = await Game.findAll({
    raw: true,
    order: [["createdAt", "DESC"]],
  });

  res.json(games);
  res.statusCode = 200;
});

router.get("/games/page/:num", async (req, res) => {
  const page = req.params.num;

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

router.post("/game", uploadImage.single("image"), async (req, res) => {
  const { name, year, price } = req.body;
  const image = req.file?.filename;

  if (
    image === undefined ||
    name === undefined ||
    year === undefined ||
    price === undefined
  ) {
    return res.status(400), res.json({ message: "Preencha todos os campos!" });
  }

  if (image === "" || name === "" || year === "" || price === "") {
    return res.status(400), res.json({ message: "Preencha todos os campos!" });
  }

  try {
    await Game.create({
      id: generateId(),
      image,
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

  const gameId = await Game.findOne({
    where: { id: id },
  });

  const deleteImageStorage = gameId.dataValues.image;
  deleteImage(deleteImageStorage);

  const game = await Game.destroy({
    where: { id: id },
  });

  if (!game) return res.status(404);

  res.status(200);
  res.json({ message: "Game excluído com sucesso!" });
});

router.put("/game/:id", uploadImage.single("image"), async (req, res) => {
  const id = req.params.id;
  const { image, name, year, price } = req.body;

  const gameId = await Game.findOne({
    where: { id: id },
  });

  if (!gameId) return res.status(404);

  if (req.file?.filename) {
    const imageStorage = req.file.filename;

    const deleteImageStorage = gameId.dataValues.image;
    deleteImage(deleteImageStorage);

    await Game.update(
      { image: imageStorage, name, year, price },
      {
        where: { id: id },
      }
    );
    return res.status(200), res.json({ message: "Game editado com sucesso!" });
  }

  await Game.update(
    { name, year, price },
    {
      where: { id: id },
    }
  );

  res.status(200);
  res.json({ message: "Game editado com sucesso!" });
});

module.exports = router;
