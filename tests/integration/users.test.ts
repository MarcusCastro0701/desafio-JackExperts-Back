import app, { init } from '@/app'; // Importa a aplicação Express e a função de inicialização
import { prisma } from '@/config'; // Importa o cliente Prisma para acesso ao banco de dados
import { faker } from '@faker-js/faker'; // Biblioteca para gerar dados falsos
import httpStatus from 'http-status'; // Biblioteca para códigos de status HTTP
import supertest from 'supertest'; // Biblioteca para testar APIs
import { createUser } from '../factories'; // Função para criar usuários fictícios
import { cleanDb } from '../helpers'; // Função para limpar o banco de dados

// Função de configuração que será executada antes de todos os testes
beforeAll(async () => {
  await init();   // Inicializa a aplicação
  await cleanDb(); // Limpa o banco de dados para garantir um ambiente limpo
});

// Função de limpeza que será executada após todos os testes
afterAll(async () => {
  await cleanDb(); // Limpa o banco de dados após os testes
});

// Cria uma instância do supertest para fazer requisições e verificar respostas
const server = supertest(app);

// Descreve um conjunto de testes para o endpoint POST /auth
describe('POST /auth', () => {
  it('should respond with status 400 when body is not given', async () => {
    // Testa se o endpoint responde com 400 quando o corpo da requisição não é fornecido
    const response = await server.post('/auth/sign-up');
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 400 when body is not valid', async () => {
    // Testa se o endpoint responde com 400 quando o corpo da requisição é inválido
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
    const response = await server.post('/auth/sign-up').send(invalidBody);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  // Descreve um conjunto de testes quando o corpo da requisição é válido
  describe('when body is valid', () => {
    // Função para gerar um corpo de requisição válido
    const generateValidBody = () => ({
      name: faker.internet.userName(),  // Nome gerado aleatoriamente
      password: faker.internet.password(),  // Senha gerada aleatoriamente
      email: faker.internet.email()  // Email gerado aleatoriamente
    });

    // Descreve um conjunto de testes quando o evento é iniciado
    describe('when event started', () => {

      it('should respond with status 201 and create user when given username is unique', async () => {
        // Testa se o endpoint responde com 201 e cria um usuário quando o nome de usuário é único
        const body = generateValidBody();

        const response = await server.post('/auth/sign-up').send(body);

        expect(response.status).toBe(httpStatus.CREATED);
        expect(response.body).toEqual({
          id: expect.any(Number),  // O id deve ser um número
          name: body.name,  // O nome deve ser igual ao fornecido
        });
      });

      it('should not return user password on body', async () => {
        // Testa se a senha do usuário não é retornada na resposta
        const body = generateValidBody();

        const response = await server.post('/auth/sign-up').send(body);

        expect(response.body).not.toHaveProperty('password');
      });

      it('should save user on db', async () => {
        // Testa se o usuário é salvo no banco de dados
        const body = generateValidBody();

        const response = await server.post('/auth/sign-up').send(body);

        const user = await prisma.user.findFirst({
          where: { name: body.name },  // Procura o usuário pelo nome
        });

        expect(user).toEqual(
          expect.objectContaining({
            id: response.body.id,  // O id deve ser igual ao retornado
            name: body.name,  // O nome deve ser igual ao fornecido
          }),
        );
      });
    });
  });
});
