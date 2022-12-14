const {Router} = require("express");
const router = Router();
const passport = require("../../index.js");

const {signupUser} = require("../../Entity/User.js");

router.get("/", (req, res) => {
  res.render("user/index", {user: req.user});
});

router.get("/login", (req, res) => {
  res.render("user/login");
});

router.post(
  "/login",
  passport.authenticate("local", {failureRedirect: "/api/user/login"}),
  (req, res) => {
    console.log("req.user: ", req.user);
    res.redirect("/api/user/");
  }
);

router.get("/signup", (req, res) => {
  res.render("user/signup");
});

router.post("/signup", (req, res) => {
  const {username, password, name, email} = req.body;
  const user = {
    username,
    password,
    name,
    email,
  };

  const newUser = signupUser(user);
  req.login(newUser, (err) => {
    res.redirect("/api/user/login");
  });
});

router.get(
  "/me",
  (req, res, next) => {
    if (!req.isAuthenticated()) return res.redirect("/api/user/login");
    next();
  },
  (req, res) => {
    res.render("user/profile", {user: req.user});
  }
);

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/api/user/");
  });
});

module.exports = router;
