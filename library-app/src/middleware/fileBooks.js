const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/upload/books");
  },
  filename(req, file, cb) {
    const today = new Date();
    cb(
      null,
      `${today.getDate()}.${
        today.getMonth() + 1
      }.${today.getFullYear()}_${today.getMilliseconds()}-${file.originalname}`
    );
  },
});

module.exports = multer({storage});
