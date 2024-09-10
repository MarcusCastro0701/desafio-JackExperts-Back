import bcrypt from "bcrypt";
import { fakerDE as faker } from '@faker-js/faker';
import { User } from "@prisma/client";
import { prisma } from "@/config";

export async function createUser(params: Partial<User> = {}): Promise<User> {
  const incomingPassword = params.password || faker.internet.password();
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  return prisma.user.create({
    data: {
      name: params.name || faker.internet.userName(),
      email: params.email || faker.internet.email(),
      password: hashedPassword,
    },
  });
}

