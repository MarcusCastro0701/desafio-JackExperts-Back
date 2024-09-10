// Importa o tipo 'Session' do Prisma Client para definir o tipo de retorno
import { Session } from "@prisma/client";
// Importa a função 'createUser' da fábrica de usuários para criar um novo usuário
import { createUser } from "./users-factory";
// Importa o cliente Prisma para interagir com o banco de dados
import { prisma } from "@/config";

// Função para criar uma nova sessão no banco de dados
export async function createSession(token: string): Promise<Session> {
  // Cria um novo usuário usando a função 'createUser' da fábrica
  const user = await createUser();

  // Cria uma nova sessão no banco de dados com o token fornecido e o ID do usuário criado
  return prisma.session.create({
    data: {
      token: token,
      userId: user.id,
    },
  });
}
