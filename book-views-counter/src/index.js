const express = require("express");
// Маршруты
const routes = require("./routes/routes.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Маршруты
app.use("/", routes);

const PORT = process.env.APP_COUNTER_PORT || 3030;
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
