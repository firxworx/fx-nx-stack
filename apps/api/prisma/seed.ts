import { Prisma, PrismaClient } from '../src/generated/prisma-client' // default configuration: '@prisma/client'
//  import type { User } from '../src/generated/prisma-client'
// import Chance from 'chance'

const client = new PrismaClient()
// var chance = new Chance()

async function seed() {
  const user: Prisma.UserCreateInput = {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'example', // @todo generate pass w/ hash
  }

  await client.user.create({ data: user })

  // for (let i = 0; i < 1000; i++) {
  //   await client.example.create({
  //     data: {
  //       title: chance.word({ length: 10 }),
  //       description: chance.sentence(),
  //       url: chance.url(),
  //       ownerId: user.id,
  //     },
  //   })
  // }
}

seed()
