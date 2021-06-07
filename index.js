import express from "express";
import mongoose from "mongoose";
import imageRoutes from "./routes/images.js";
import userRoutes from "./routes/users.js";
import loginRoutes from "./routes/login.js";
import passport from "passport";

import "dotenv/config";

const app = express();
const port = process.env.PORT || 4041;

mongoose.Promise = global.Promise;

mongoose
    .connect(process.env.LOCAL_MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then((connection) => {
        console.log("Connected to Database....");
    })
    .catch((err) => {
        console.log("Error: ", err);
    });

// Image controller
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());
require("./strategies/strategies")(passport);

app.use("/api/images", imageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/login", loginRoutes);

app.listen(port, () => {
    console.log(`server is runnng on port: ${port}`);
});
