import {Prisma} from '@prisma/client'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const meetingWithContact = Prisma.validator<Prisma.MeetingDefaultArgs>()({
  include: {
    contact: {
      select: {
        firstName: true,
        lastName: true,
      },
    },
  },
})

export type MeetingWithContact = Prisma.MeetingGetPayload<typeof meetingWithContact>
