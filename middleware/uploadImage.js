const multer = require("multer");

module.exports = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./image");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    const extendedImg = ["image/png", "image/jpg", "image/jpeg"].find(
      (acceptedFormat) => acceptedFormat == file.mimetype
    );

    if (extendedImg) {
      return cb(null, true);
    }

    return cb(null, false);
  },
});
