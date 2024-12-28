import {Prisma} from '@prisma/client'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const groupWithUsers = Prisma.validator<Prisma.GroepDefaultArgs>()({
  include: {
    users: {
      select: {
        voornaam: true,
        familienaam: true,
      },
    },
  },
})

export type GroupWithUsers = Prisma.GroepGetPayload<typeof groupWithUsers>