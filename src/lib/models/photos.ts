import {Prisma} from '@prisma/client'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const photoWithUserAndGroup = Prisma.validator<Prisma.FotoDefaultArgs>()({
  include: {
    gebruiker: {
      select: {
        voornaam: true,
        familienaam: true,
        groep: {
          select: {
            naam: true
          },
        }
      },
    },
  },
})

export type PhotoWithUserAndGroup = Prisma.FotoGetPayload<typeof photoWithUserAndGroup>