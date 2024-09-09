import { fakerDE as faker } from '@faker-js/faker';
import { Task } from '@prisma/client';
import { prisma } from '@/config';

export function createTask(params: Partial<Task> = {}): Promise<Task> {
  return prisma.task.create({
    data: {
      name: params.name || faker.person.fullName(),
      description: params.description || faker.lorem.text(),
    },
  });
}
