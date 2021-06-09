import pkgs from "passport-jwt";
import pkg from "passport-jwt";
const { Strategy: JwtStrategy } = pkgs
const { ExtractJwt } = pkg;
import Users from "../models/users.js";

function passportStrategy(passport) {
    const opts = {};

    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT;
    passport.use(
        new JwtStrategy(opts, function (jwt_payload, done) {
            Users.findOne({ id: jwt_payload.sub }, '-password', function (err, user) {
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
