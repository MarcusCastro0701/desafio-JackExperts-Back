import app, { init } from '@/app';
import { prisma } from '@/config';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createSession, createTask } from '../factories';
import { cleanDb } from '../helpers';
import { createUser } from '../factories';
import * as jwt from "jsonwebtoken";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('GET /task', () => {
  it('should respond with status 401 when body is not given', async () => {
    const response = await server.get('/task');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/task");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/task").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/task").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 400 if there is no task for the given id", async () => {
    const user = await createUser();

    const session = await createSession(jwt.sign({ userId: user.id }, process.env.JWT_SECRET))

    const response = await server.get(`/task/${0}`).set("Authorization", `Bearer ${session}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
});

describe('POST /task', () => {

  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/task");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.post("/task").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post("/task").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 400 when body is not valid', async () => {

    const user = await createUser();

    const session = await createSession(jwt.sign({ userId: user.id }, process.env.JWT_SECRET))

    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post('/task').send(invalidBody).set("Authorization", `Bearer ${session.token}`);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

});

describe('PUT /task/check', () => {

  it("should respond with status 401 if no token is given", async () => {
    const response = await server.delete(`/task/check/${1}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.delete(`/task/check/${1}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.delete(`/task/check/${1}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

});

describe('PUT /task/data', () => {

  it("should respond with status 401 if no token is given", async () => {
    const response = await server.delete(`/task/data/${1}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.delete(`/task/data/${1}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.delete(`/task/data/${1}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

});

describe('DELETE /task', () => {

  it("should respond with status 401 if no token is given", async () => {
    const response = await server.delete(`/task/${1}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.delete(`/task/${1}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.delete(`/task/${1}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

});
