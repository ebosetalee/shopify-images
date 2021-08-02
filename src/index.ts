import "dotenv/config";
import mongoose from "mongoose";
import { app, port } from "./app";

export async function connectToDB() {
  mongoose.Promise = global.Promise;
  try {
    await mongoose.connect(process.env.LOCAL_MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log("Connected to Database....");
  } catch (err) {
    console.log("Error: ", err);
  }
}

async function boot() {
  await connectToDB();
  app.listen(port, () => {
    console.log(`server is runnng on port: ${port}`);
  });
}

boot();
