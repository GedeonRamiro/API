const fs = require("fs");

const deleteImage = (image) => {
  return fs.unlink(`./image/${image}`, (err) => {
    if (err) {
      console.log("Erro ao deletar image");
      console.log(err.message);
    }

    console.log("Image deletado com sucesso");
  });
};

module.exports = deleteImage;
