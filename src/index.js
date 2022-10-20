require("dotenv").config();
const express = require("express");
// Маршруты
const userRoutes = require("./routes/api/user.js");
const booksRoutes = require("./routes/api/books.js");

const app = express();
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/books", booksRoutes);

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
