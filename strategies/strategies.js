import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";

function passportStrategy(passport) {
    const opts = {};

    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT;
    passport.use(
        new JwtStrategy(opts, function (jwt_payload, done) {
            User.findOne({ id: jwt_payload.sub }, function (err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                    // or you could create a new account
                }
            });
        })
    );
}

export default passportStrategy;
