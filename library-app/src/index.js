require("dotenv").config();
const nodePath = require("path");
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
module.exports = passport;

const {findById} = require("./Entity/User.js");

// Middleware
const errorMiddleware = require("./middleware/error.js");
// Маршруты страниц
const indexRouter = require("./routes/pages.js");
// API маршруты
const apiUserRoutes = require("./routes/api/user.js");
const apiBooksRoutes = require("./routes/api/books.js");

// Utils
const verify = require("./utils/verify.js");

const options = {
  usernameField: "username",
  passwordField: "password",
};

passport.use("local", new LocalStrategy(options, verify));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  findById(id, (err, user) => {
    if (err) return cb(err);
    cb(null, user);
  });
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
  session({
    secret: "secret-key",
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set("views", nodePath.join(__dirname, `views/`));
app.set("view engine", "ejs");
// Маршруты страниц
app.use("/", indexRouter);
// API маршруты
app.use("/api/user", apiUserRoutes);
app.use("/api/books", apiBooksRoutes);

app.use(errorMiddleware);

const PORT = process.env.APP_PORT || 3000;
const MONGO_DB_URL = process.env.ME_CONFIG_MONGODB_URL;

async function start() {
  try {
    await mongoose.connect(MONGO_DB_URL, {useUnifiedTopology: true});
    console.log(`Express server connected with Mongo`);
    app.listen(PORT, () => {
      console.log(`Express server listening on port ${PORT}\n`);
    });
  } catch (error) {}
}

start();
