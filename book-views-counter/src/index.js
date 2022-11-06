const express = require("express");
const redisClient = require("./redis.js");
// Маршруты
const routes = require("./routes/routes.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

(async () => {
  await redisClient.connect();
  console.log(`Server connected with Redis`);
})();

// Маршруты
app.use("/", routes);

const PORT = process.env.APP_COUNTER_PORT || 3030;
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
