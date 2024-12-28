import 'server-only'
import {prismaClient} from '@/lib/server/dal/utils/prismaClient'
import {Prisma, Session, User} from '@prisma/client'
import {Profile, SessionProfile} from '@/lib/models/users'
import {randomBytes} from 'crypto'
import {cache} from 'react'
import {hashPassword} from '@serverUtils'

/**
 * Eén of meerdere users ophalen
 */
export async function getUsers(zoekterm: string): Promise<User[]> {
  return prismaClient.user.findMany({
    where: {
      OR: [
        {voornaam: {contains: zoekterm, mode: 'insensitive'}},
        {familienaam: {contains: zoekterm, mode: 'insensitive'}},
      ],
    },
  })
}
export async function getUser(id: string): Promise<User> {
  return prismaClient.user.findUniqueOrThrow({where: {id}})
}
export async function getUserByEmail(email: string): Promise<User | null> {
  return prismaClient.user.findFirst({where: {email}})
}

/**
 * Nieuwe user aanmaken (met een hashed en salted wachtwoord.)
 */
export async function createUser(data: Omit<Prisma.UserCreateInput, "username">): Promise<Profile> {
  //Een nieuwe gebruiker is automatisch een 'gebruiker'
  const roleNewUser = await prismaClient.role.findFirst({
    where: { name: 'gebruiker' },
  });
  if (!roleNewUser) {
    throw new Error("De rol 'gebruiker' bestaat niet in de databank.");
  }

  return prismaClient.user.create({
    data: {
      ...data,
      username: `${data.voornaam}.${data.familienaam}`,
      password: hashPassword(data.password),
      actief: true,
      roleId: roleNewUser.id
    },
    select: {
      id: true,
      email: true,
      username: true,
      role: {
        select: {
          name: true,
        },
      },
    },
  })
}

/**
 * Sessies
 */
export const getSessionProfile = cache(async (id: string): Promise<SessionProfile | null> => {
  return prismaClient.session.findUnique({
    where: {
      id,
      activeUntil: {
        gt: new Date(),
      },
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          username: true,
        },
        include: {
          role: true
        }
      },
    },
  })
})
export async function startSession(userId: string): Promise<Session> {
  const id = randomBytes(32).toString('hex')
  return prismaClient.session.create({
    data: {
      id,
      userId,
      activeFrom: new Date(),
    },
  })
}
export async function stopSession(id: string): Promise<void> {
  await prismaClient.session.delete({where: {id}})
}
export async function extendSession(id: string): Promise<Session> {
  return prismaClient.session.update({
    where: {id},
    data: {
      activeUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),  //14 dagen verlengd
    },
  })
}

/**
 * Update en Delete
 */
/*export async function updateUser(user: Prisma.UserUpdateInput & {id: string}): Promise<User> {
  return await prismaClient.user.update({where: {id: user.id}, data: user})
}*/
export async function updateUser(userId: string, data: Prisma.UserUpdateInput): Promise<Profile> {
  return await prismaClient.user.update({
    where: {id: userId},
    data: {
      ...data,
      id: userId,
    },
  })
}
export async function deleteUser(id: string): Promise<void> {
  await prismaClient.user.delete({where: {id}})
}


