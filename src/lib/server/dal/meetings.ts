import 'server-only'
import {prismaClient} from '@/lib/server/dal/utils/prismaClient'
import {MeetingWithContact} from '@/lib/models/meetings'
import {Prisma} from '@prisma/client'

// De MeetingCreateInput interface bevat een definitie voor de contact property.
// Aangezien deze definitie specifiek is aan Prisma, willen we niet dat andere lagen van de applicatie een property
// moeten meegeven in deze vorm.
// Daarom gebruiken we de MeetingCreateWithoutContactInput interface en geven we zelf een definitie voor de contact
// property.
//
// We accepteren zowel een string als een Prisma.ContactCreateInput object voor de contact property.
// Op deze manier kunnen we in de functie een bestaand contact linken aan de meeting of een nieuw contact aanmaken.

export interface CreateMeetingParams extends Omit<Prisma.MeetingCreateWithoutContactInput, 'user'> {
  contact: string | Prisma.ContactCreateWithoutUserInput
}

/**
 * Add a new meeting to the database.
 *
 * @param userId The id of the user for whom to create the meeting.
 * @param contact The id of the contact or the contact information to create a new contact.
 * @param meeting The meeting information.
 */
export async function createMeeting(
  userId: string,
  {contact, ...meeting}: CreateMeetingParams,
): Promise<MeetingWithContact> {
  const contactExists = typeof contact === 'string'

  return prismaClient.meeting.create({
    data: {
      ...meeting,
      contact: {
        // Via de connect property kunnen we een bestaand contact linken aan de meeting.
        // Via de create property kunnen we een nieuw contact aanmaken en linken aan de meeting.
        [contactExists ? 'connect' : 'create']: contactExists
          ? {id: contact}
          : {...contact, user: {connect: {id: userId}}},
      },
      user: {
        connect: {id: userId},
      },
    },
    include: {
      contact: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  })
}

/**
 * Retrieve all the planned meetings and basic information about the associated contact.
 */
export async function getMeetings(userId: string): Promise<MeetingWithContact[]> {
  return prismaClient.meeting.findMany({
    orderBy: {date: 'asc'},
    where: {date: {gte: new Date()}, userId},
    include: {
      contact: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  })
}

/**
 * Retrieve a planned meeting and basic information about the associated contact.
 */
export async function getMeeting(userId: string, id: string): Promise<MeetingWithContact> {
  return prismaClient.meeting.findUniqueOrThrow({
    where: {id, userId},
    include: {
      contact: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  })
}

export interface UpdateMeetingParams extends CreateMeetingParams {
  id: string
}

/**
 * Update an existing meeting.
 */
export async function updateMeeting(
  userId: string,
  {contact, ...meeting}: UpdateMeetingParams,
): Promise<MeetingWithContact> {
  const contactExists = typeof contact === 'string'

  return prismaClient.meeting.update({
    where: {id: meeting.id, userId},
    data: {
      ...meeting,
      contact: {
        [contactExists ? 'connect' : 'create']: contactExists
          ? {id: contact}
          : {...contact, user: {connect: {id: userId}}},
      },
    },
    include: {
      contact: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  })
}

/**
 * Delete a meeting from the database.
 *
 * @param userId The id of the user for whom to delete the meeting.
 * @param id The id of the meeting to delete.
 */
export async function deleteMeeting(userId: string, id: string): Promise<void> {
  await prismaClient.meeting.delete({where: {id, userId}})
}
