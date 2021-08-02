import express from "express";
import passport from "passport";
import passportStrategy from "./strategies/passport";
import imageRoutes from "./routes/images";
import loginRoutes from "./routes/login";
import userRoutes from "./routes/users";

export const app = express();
export const port = process.env.PORT || 4041;
// Image controller
app.use(express.json());
// app.use(uploads.cloudConfig)
app.use(passport.initialize());
app.use(passport.session());
passportStrategy(passport);
app.use("/api/images", imageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/", loginRoutes);
