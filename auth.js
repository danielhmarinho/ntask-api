import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

module.exports = app => {
  const Users = app.db.models.Users;
  const cfg = app.libs.config;
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = cfg.jwtSecret;
  passport.use(new Strategy(opts, function(jwt_payload, done) {
      Users.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, {
              id: user.id,
              email: user.email
            });
          }
          return done(null, false);
        })
        .catch(error => done(error, null));
    }));
  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate("jwt", cfg.jwtSession);
    }
  };
};
