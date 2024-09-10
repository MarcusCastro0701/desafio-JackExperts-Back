// Importa o módulo http-status para facilitar a comparação de códigos de status HTTP
import httpStatus from 'http-status';
// Importa o supertest para facilitar a realização de requisições HTTP de teste
import supertest from 'supertest';
// Importa o app e a função init do módulo de configuração da aplicação
import app, { init } from '@/app';

// Função de configuração que será executada antes de todos os testes
beforeAll(async () => {
  // Inicializa a aplicação antes de executar os testes
  await init();
});

// Cria uma instância do supertest para testar a aplicação
const server = supertest(app);

// Descreve um conjunto de testes para o endpoint GET /health
describe('GET /health', () => {
  // Define um teste específico para o endpoint GET /health
  it('should respond with status 200 with OK! text', async () => {
    // Realiza uma requisição GET para o endpoint /health
    const response = await server.get('/health');

    // Verifica se o status da resposta é 200 (OK)
    expect(response.status).toBe(httpStatus.OK);
    // Verifica se o texto da resposta é 'OK!'
    expect(response.text).toBe('OK!');
  });
});
