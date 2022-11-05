const {Router} = require("express");
const router = Router();

router.post("/counter/:bookId/incr", (req, res) => {});

router.get("/counter/:bookId", (req, res) => {});

module.exports = router;
