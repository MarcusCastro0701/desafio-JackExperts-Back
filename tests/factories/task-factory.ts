// Importa o faker para gerar dados falsos para testes
import { fakerDE as faker } from '@faker-js/faker';
// Importa o tipo 'Task' do Prisma Client para definir o tipo de retorno
import { Task } from '@prisma/client';
// Importa o cliente Prisma para interagir com o banco de dados
import { prisma } from '@/config';

// Função para criar uma nova tarefa no banco de dados com dados falsos ou fornecidos
export function createTask(params: Partial<Task> = {}): Promise<Task> {
  // Cria uma nova tarefa no banco de dados
  return prisma.task.create({
    data: {
      // Usa o nome fornecido ou gera um nome falso se não fornecido
      name: params.name || faker.person.fullName(),
      // Usa a descrição fornecida ou gera uma descrição falsa se não fornecida
      description: params.description || faker.lorem.text(),
    },
  });
}
