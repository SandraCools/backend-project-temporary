import {Gemeente, Prisma} from '@prisma/client'
import {prismaClient} from './utils/prismaClient'

/**
 * Nieuwe gemeente
 */
export async function createCity(cityInput: Prisma.GemeenteCreateInput): Promise<Gemeente> {
  return prismaClient.gemeente.create({data: { ...cityInput }})
}

/**
 * Gemeente(s) ophalen
 */
export async function getCities(): Promise<Gemeente[]> {
  return prismaClient.gemeente.findMany()
}
export async function getCity(id: string): Promise<Gemeente> {
  return prismaClient.gemeente.findUniqueOrThrow({where: {id}})
}

/**
 * Gemeente verwijderen
 */
export async function deleteCity(id: string): Promise<void> {
  await prismaClient.gemeente.delete({where: {id}})
}

/**
 * Gemeente aanpassen
 */
export async function updateCity(city: Prisma.GemeenteUpdateInput & {id: string}): Promise<Gemeente> {
  return await prismaClient.gemeente.update({where: {id: city.id}, data: city})
}