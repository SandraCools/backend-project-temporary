import {Prisma} from '@prisma/client'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const schoolWithCity = Prisma.validator<Prisma.SchoolDefaultArgs>()({
  include: {
    gemeente: {
      select: {
        naam: true,
        postcode: true,
      },
    },
  },
})

export type SchoolWithCity = Prisma.SchoolGetPayload<typeof schoolWithCity>