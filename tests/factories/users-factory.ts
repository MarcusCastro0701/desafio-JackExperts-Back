// Importa a biblioteca bcrypt para hashing de senhas
import bcrypt from "bcrypt";
// Importa o faker para gerar dados falsos para testes
import { fakerDE as faker } from '@faker-js/faker';
// Importa o tipo 'User' do Prisma Client para definir o tipo de retorno
import { User } from "@prisma/client";
// Importa o cliente Prisma para interagir com o banco de dados
import { prisma } from "@/config";

// Função para criar um novo usuário no banco de dados com dados falsos ou fornecidos
export async function createUser(params: Partial<User> = {}): Promise<User> {
  // Define a senha que será usada. Se não fornecida, gera uma senha falsa usando o faker.
  const incomingPassword = params.password || faker.internet.password();
  // Gera o hash da senha usando bcrypt
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  // Cria um novo usuário no banco de dados
  return prisma.user.create({
    data: {
      // Usa o nome fornecido ou gera um nome de usuário falso se não fornecido
      name: params.name || faker.internet.userName(),
      // Usa o e-mail fornecido ou gera um e-mail falso se não fornecido
      email: params.email || faker.internet.email(),
      // Usa a senha hasheada gerada anteriormente
      password: hashedPassword,
    },
  });
}
