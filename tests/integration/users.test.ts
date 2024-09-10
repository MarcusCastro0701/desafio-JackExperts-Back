import app, { init } from '@/app';
import { prisma } from '@/config';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createUser } from '../factories';
import { cleanDb } from '../helpers';

beforeAll(async () => {
  await init();
  await cleanDb();
});

afterAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('POST /auth', () => {
  it('should respond with status 400 when body is not given', async () => {
    const response = await server.post('/auth/sign-up');

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 400 when body is not valid', async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post('/auth/sign-up').send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });


  describe('when body is valid', () => {
    const generateValidBody = () => ({
      name: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email()
    });


    describe('when event started', () => {

      it('should respond with status 201 and create user when given username is unique', async () => {
        const body = generateValidBody();

        const response = await server.post('/auth/sign-up').send(body);

        expect(response.status).toBe(httpStatus.CREATED);
        expect(response.body).toEqual({
          id: expect.any(Number),
          name: body.name,
        });
      });

      it('should not return user password on body', async () => {
        const body = generateValidBody();

        const response = await server.post('/auth/sign-up').send(body);

        expect(response.body).not.toHaveProperty('password');
      });

      it('should save user on db', async () => {
        const body = generateValidBody();

        const response = await server.post('/auth/sign-up').send(body);

        const user = await prisma.user.findFirst({
          where: { name: body.name },
        });

        expect(user).toEqual(
          expect.objectContaining({
            id: response.body.id,
            name: body.name,
          }),
        );
      });
    });
  });
});
