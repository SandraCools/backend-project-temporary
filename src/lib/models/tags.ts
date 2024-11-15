import {Prisma} from '@prisma/client'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tagWithContacts = Prisma.validator<Prisma.TagDefaultArgs>()({
  include: {
    contacts: {
      select: {
        firstName: true,
        lastName: true,
        id: true,
      },
    },
  },
})

export type TagWithContacts = Prisma.TagGetPayload<typeof tagWithContacts>
