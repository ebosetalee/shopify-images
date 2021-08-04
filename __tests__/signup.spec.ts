import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { app } from "../src/app";
import Users from "../src/models/users";

let http: supertest.SuperTest<supertest.Test>;
let mongod: MongoMemoryServer;

beforeAll(async () => {
  mongod = new MongoMemoryServer({
    instance: {
      dbName: "shopifyimages"
    }
  });
  await mongod.start();
  await mongod.ensureInstance();
  await mongoose.connect(mongod.getUri(), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });

  http = supertest(app);
});

afterAll(async () => {
  await mongod.stop();
});

describe("user sign up", () => {
  beforeEach(async () => {
    await Users.deleteMany({});
  });

  test("creates a new user if the email address is available", async () => {
    const credentials = {
      emailAddress: "new_user@example.com",
      password: "you can't see me",
      username: "emmanuella",
      role: "admin"
    };

    const { body } = await http
      .post("/api/signup")
      .send(credentials)
      .expect(StatusCodes.OK);

    expect(body.tokenid).toBeDefined();
    expect(body.message).toMatch(/account created/i);
    expect(body.data.emailAddress).toBe(credentials.emailAddress);
    expect(body.data.role).toBe(credentials.role);
    expect(body.data.username).toBe(credentials.username);
  });

  test("fails if the email address is taken", async () => {
    const credentials = {
      emailAddress: "new_user@example.com",
      password: "you can't see me",
      username: "emmanuella",
      role: "admin"
    };

    await http.post("/api/signup").send(credentials).expect(StatusCodes.OK);

    const { body } = await http
      .post("/api/signup")
      .send(credentials)
      .expect(StatusCodes.BAD_REQUEST);

    expect(body.message).toMatch(/user already exists/i);
  });
});
