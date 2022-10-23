require("dotenv").config();
const nodePath = require("path");
const express = require("express");
// Маршруты страниц
const indexRouter = require("./routes/index.js");
// API маршруты
const apiUserRoutes = require("./routes/api/user.js");
const apiBooksRoutes = require("./routes/api/books.js");

const app = express();
app.use(express.json());

app.set("views", nodePath.join(__dirname, `views/`));
app.set("view engine", "ejs");
// Маршруты страниц
app.use("/", indexRouter);
// API маршруты
app.use("/api/user", apiUserRoutes);
app.use("/api/books", apiBooksRoutes);

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
