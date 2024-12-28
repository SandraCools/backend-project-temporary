import {Prisma} from '@prisma/client'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const berichtMetInfo = Prisma.validator<Prisma.BerichtDefaultArgs>()({
  include: {
    verzender: {
      select: {
        voornaam: true,
        familienaam: true,
      },
    },
    ontvangers: {
      select: {
        voornaam: true,
        familienaam: true,
      }
    }
  },
})

export type BerichtMetInfo = Prisma.BerichtGetPayload<typeof berichtMetInfo>