import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

async function main() {
  try {
    // Test query
    const count = await prisma.user.count().$accelerate()
    console.log('Connection successful! User count:', count)
  } catch (error) {
    console.error('Database connection error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 