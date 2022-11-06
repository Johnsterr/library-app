const redis = require("redis");

const REDIS_URL = process.env.REDIS_URL || "redis://redis-db"; // redis-db - имя контейнера

const redisClient = redis.createClient({
  url: REDIS_URL,
});

module.exports = redisClient;
