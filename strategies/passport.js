import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import Users from "../models/users.js";

function passportStrategy(passport) {
    const opts = {};

    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT;
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            Users.findOne(
                { _id: jwt_payload._id },
                "-password",
                (err, user) => {
                    if (err) {
                        return done(err, false);
                    }
                    if (user) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                        // or you could create a new account
                    }
                }
            );
        })
    );
    passport.use(
        "admin",
        new JwtStrategy(opts, (jwt_payload, done) => {
            Users.findOne(
                { _id: jwt_payload._id },
                "-password",
                (err, user) => {
                    if (err) {
                        return done(err, false);
                    }
                    if (user.role == "admin") {
                        return done(null, user);
                    } else {
                        return done(null, false);
                        // or you could create a new account
                    }
                }
            );
        })
    );
}

export default passportStrategy;
