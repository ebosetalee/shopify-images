import express from "express";
import mongoose from "mongoose";
import imageRoutes from "./routes/images.js";
import userRoutes from "./routes/users.js";

const app = express();
const LOCAL_MONGO_DB = "mongodb://127.0.0.1:27017/shopifyimages";
const port = process.env.PORT || 4041;

mongoose.Promise = global.Promise;

mongoose
    .connect(LOCAL_MONGO_DB, {
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
app.use("/api/images", imageRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
    console.log(`server is runnng on port: ${port}`);
});
