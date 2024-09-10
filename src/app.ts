// Importa funções e configurações necessárias para a aplicação
import { connectDb, disconnectDB, loadEnv } from '@/config';
import cors from "cors";
import express, { Express } from "express";

// Importa um módulo para tratamento de erros assíncronos no Express
import "express-async-errors";

// Importa os roteadores para autenticação e tarefas
import { authRouter } from "./routers/auth-router";
import { taskRouter } from "./routers/task-router";

// Carrega variáveis de ambiente do arquivo de configuração
loadEnv();

// Cria uma instância do aplicativo Express
const app = express();

// Configura o middleware e as rotas do aplicativo
app
  // Adiciona suporte para CORS (Cross-Origin Resource Sharing) para permitir requisições de diferentes origens
  .use(cors())
  // Adiciona suporte para o parsing de JSON no corpo das requisições
  .use(express.json())
  // Define uma rota de saúde para verificar se o servidor está funcionando
  .get("/health", (_req, res) => res.send("OK!"))
  // Configura as rotas de autenticação e tarefas
  .use("/auth", authRouter)
  .use("/task", taskRouter);

// Exporta a instância do aplicativo para uso em outros módulos
export default app;

// Função para inicializar a aplicação e conectar ao banco de dados
export function init(): Promise<Express> {
  connectDb(); // Conecta ao banco de dados
  return Promise.resolve(app); // Retorna uma Promise resolvida com a instância do aplicativo
}

// Função para fechar a conexão com o banco de dados
export async function close(): Promise<void> {
  await disconnectDB(); // Aguarda a desconexão do banco de dados
}
