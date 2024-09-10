import { prisma } from '@/config';
import { createSession } from './factories';
import { createUser } from './factories';
import * as jwt from "jsonwebtoken";
import { User } from '@prisma/client';

// Limpa todas as entradas das tabelas de tarefas, sessões e usuários
// Esta função é útil para preparar o banco de dados para testes,
// garantindo que ele esteja em um estado limpo antes de cada execução de teste.
export async function cleanDb() {
  await prisma.task.deleteMany({}); // Remove todas as tarefas do banco de dados
  await prisma.session.deleteMany({}); // Remove todas as sessões do banco de dados
  await prisma.user.deleteMany({}); // Remove todos os usuários do banco de dados
}

// Gera um token JWT válido para um usuário.
// Se um usuário não for fornecido, um novo usuário será criado.
// A função também cria uma sessão para o token gerado.
export async function generateValidToken(user?: User) {
  const incomingUser = user || (await createUser()); // Usa o usuário fornecido ou cria um novo
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET); // Gera um token JWT

  await createSession(token); // Cria uma sessão para o token gerado

  return token; // Retorna o token gerado
}
