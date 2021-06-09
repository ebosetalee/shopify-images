import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import passportStrategy from "./strategies/strategies.js";
import imageRoutes from "./routes/images.js";
import loginRoutes from "./routes/login.js";
import userRoutes from "./routes/users.js";
//import uploads from "./strategies/cloudinaryStrategies.js"
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
    .then(() => {
        console.log("Connected to Database....");
    })
    .catch((err) => {
        console.log("Error: ", err);
    });

// Image controller
app.use(express.json());
// app.use(uploads.cloudConfig)
app.use(passport.initialize());
app.use(passport.session());
passportStrategy(passport);

app.use("/api/images", imageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/login", loginRoutes);

app.listen(port, () => {
    console.log(`server is runnng on port: ${port}`);
});
