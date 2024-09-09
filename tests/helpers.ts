import { prisma } from '@/config';

export async function cleanDb() {
  await prisma.user.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.session.deleteMany({});
}
