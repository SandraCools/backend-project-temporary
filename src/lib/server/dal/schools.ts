import {School, Prisma} from '@prisma/client'
import {prismaClient} from './utils/prismaClient'
import {SchoolWithCity} from '@/lib/models/schools'

/**
 * Nieuwe school
 */
export async function createSchool(schoolInput: Prisma.SchoolCreateInput): Promise<School> {
  return prismaClient.school.create({data: { ...schoolInput }})
}

/**
 * Scholen ophalen
 */
export async function getSchools(): Promise<School[]> {
  return prismaClient.school.findMany()
}
export async function getSchool(id: string): Promise<SchoolWithCity> {
  return prismaClient.school.findUniqueOrThrow({
    where: {id},
    include: {
      gemeente: {
        select: {
          naam: true,
          postcode: true,
          },
      },
    },
  })
}

/**
 * School verwijderen
 */
export async function deleteSchool(id: string): Promise<void> {
  await prismaClient.school.delete({where: {id}})
}

/**
 * School aanpassen
 */
export async function updateSchool(school: Prisma.SchoolUpdateInput & {id: string}): Promise<SchoolWithCity> {
  const updatedSchool = await prismaClient.school.update({where: {id: school.id}, data: school})
  return updatedSchool as SchoolWithCity
}