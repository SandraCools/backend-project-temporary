import {Groep, Prisma} from '@prisma/client'
import {prismaClient} from './utils/prismaClient'
import {GroupWithUsers} from '@/lib/models/groups'

/**
 * Nieuwe groep
 */
export async function createGroup(groepInput: Prisma.GroepCreateInput): Promise<Groep> {
  return prismaClient.groep.create({data: {...groepInput}})
}

/**
 * Groep(en) ophalen
 */
export async function getGroups(): Promise<Groep[]> {
  return prismaClient.groep.findMany()
}

export async function getGroup(id: string): Promise<GroupWithUsers> {
  return prismaClient.groep.findUniqueOrThrow({
    where: {id},
    include: {
      users: {
        select: {
          voornaam: true,
          familienaam: true,
          },
      },
    },
  })
}

/**
 * Groep verwijderen
 */
export async function deleteGroup(id: string): Promise<void> {
  await prismaClient.groep.delete({where: {id}})
}

/**
 * Groep aanpassen
 * vb: naam wijzigen (aanpassingen aan leden van groepen: zie hieronder)
 */
export async function updateGroup(group: Prisma.GroepUpdateInput & {id: string}): Promise<Groep> {
  return await prismaClient.groep.update({where: {id: group.id}, data: group})
}

/**
 * Voeg gebruikers toe aan een groep.
 */
export async function linkUsersToGroup(groepId: string, userIds: string[]): Promise<void> {
  await prismaClient.groep.update({
    where: {id: groepId},
    data: {
      users: {
        connect: userIds.map(id => ({id})),
      },
    },
  })
}

/**
 * Verwijder gebruikers uit een groep
 */
export async function disconnectUsersFromGroup(groupId: string, userIds: string[]): Promise<void> {
  await prismaClient.groep.update({
    where: {id: groupId},
    data: {
      users: {
        disconnect: userIds.map(id => ({id})),
      },
    },
  })
}

/**
 * Wissel (een) gebruiker(s) van groep A naar groep B
 */
export async function changeGroup(fromGroupId: string, toGroupId: string, userIds: string[]): Promise<void> {
  await prismaClient.groep.update({
    where: {id: fromGroupId},
    data: {
      users: {
        disconnect: userIds.map(id => ({id})),
      },
    },
  })
  await prismaClient.groep.update({
    where: {id: toGroupId},
    data: {
      users: {
        connect: userIds.map(id => ({id})),
      },
    },
  })
}
