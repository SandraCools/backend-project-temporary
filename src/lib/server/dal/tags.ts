import {Tag, Prisma} from '@prisma/client'
import {prismaClient} from './utils/prismaClient'
import {TagWithContacts} from '@/lib/models/tags'

/**
 * Create a new tag.
 */
export async function createTag(userId: string, tagInput: Prisma.TagCreateWithoutUserInput): Promise<Tag> {
  return prismaClient.tag.create({data: {userId, ...tagInput}})
}

/**
 * Retrieve all tags.
 */
export async function getTags(userId: string): Promise<Tag[]> {
  return prismaClient.tag.findMany({where: {userId}})
}

/**
 * Get a specific tag from the database.
 *
 * @param userId
 * @param id The id of the tag to retrieve.
 */
export async function getTag(userId: string, id: string): Promise<TagWithContacts> {
  return prismaClient.tag.findUniqueOrThrow({
    where: {id, userId},
    include: {
      contacts: {
        select: {id: true, firstName: true, lastName: true},
      },
    },
  })
}

/**
 * Delete a tag.
 *
 * @param userId The id of the user who owns the tag.
 * @param id The id of the tag to delete.
 */
export async function deleteTag(userId: string, id: string): Promise<void> {
  await prismaClient.tag.delete({where: {id, userId}})
}

/**
 * Link a tag to a contact.
 *
 * @param userId The id of the user who owns the tag.
 * @param tagId The id of the tag for which to link the contacts.
 * @param contactIds The ids of the contacts to connect to the tag.
 */
export async function linkTagToContact(userId: string, tagId: string, contactIds: string[]): Promise<void> {
  await prismaClient.tag.update({
    where: {id: tagId, userId},
    data: {
      contacts: {
        connect: contactIds.map(id => ({id})),
      },
    },
  })
}

/**
 * Remove a tag from a contact.
 *
 * @param userId The id of the user who owns the tag.
 * @param tagId The id of the tag from which to remove the contacts.
 * @param contactIds The ids of the contacts to remove from the tag.
 */
export async function disconnectTagFromContact(userId: string, tagId: string, contactIds: string[]): Promise<void> {
  await prismaClient.tag.update({
    where: {id: tagId, userId},
    data: {
      contacts: {
        disconnect: contactIds.map(id => ({id})),
      },
    },
  })
}
