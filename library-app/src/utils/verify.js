const {findByUsername, verifyPassword} = require("../Entity/User.js");

const verify = (username, password, done) => {
  findByUsername(username, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    if (!verifyPassword(user, password)) {
      return done(null, false);
    }

    return done(null, user);
  });
};

module.exports = verify;
