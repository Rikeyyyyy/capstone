import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

async function main() {
  try {
    // Test query using Prisma Accelerate
    const users = await prisma.user.findMany()
    console.log('Connection successful! Users:', users)
  } catch (error) {
    console.error('Database connection error:', error)
    console.error('Error details:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((error) => {
  console.error('Unhandled error:', error)
  process.exit(1)
}) 