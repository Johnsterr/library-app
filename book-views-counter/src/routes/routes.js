const {Router} = require("express");
const router = Router();
const redisClient = require("../redis.js");

router.post("/counter/:bookId/incr", async (req, res) => {
  const {bookId} = req.params;

  const incrResult = await redisClient.incr(bookId);

  res.json({
    views: incrResult,
  });
});

router.get("/counter/:bookId", async (req, res) => {
  const {bookId} = req.params;

  const viewsResult = await redisClient.get(bookId);

  res.json({
    views: viewsResult,
  });
});

module.exports = router;
