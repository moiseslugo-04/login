import { PrismaClient, Prisma } from './lib/generated/prisma'
// !==
const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput = {
  name: 'Charlie',
  email: 'charlie@prisma.io',
  password: '123456',
  todos: {
    create: [
      { title: 'Learn Next.js', status: 'PENDING' },
      { title: 'Build Todo App', status: 'INPROCESS' },
      { title: 'Deploy App', status: 'DONE' },
    ],
  },
}

export async function main() {
  const user = await prisma.user.create({ data: userData })
  console.log('User created:', user)
}
main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
