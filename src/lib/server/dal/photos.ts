import {Foto, Prisma} from '@prisma/client'
import {prismaClient} from './utils/prismaClient'
import {PhotoWithUserAndGroup} from '@/lib/models/photos'

/**
 * Nieuwe foto
 * Huidige datum wordt gebruikt voor de timestamp
 * Huidige gebruiker wordt aan foto gekoppeld als 'maker'
 */
export interface CreatePhotoParams extends Prisma.FotoCreateWithoutGebruikerInput{
  makerId: string
}
export async function createPhoto({makerId, ...photoInput}: CreatePhotoParams): Promise<Foto> {
  return prismaClient.foto.create({
    data: {
      ...photoInput,
      uploadedAt: new Date().toISOString(),
      gebruikerId: makerId,
    }})
}

/**
 * Foto(s) ophalen
 */
export async function getPhotos(): Promise<Foto[]> {
  return prismaClient.foto.findMany()
}
export async function getPhoto(id: string): Promise<PhotoWithUserAndGroup> {
  return prismaClient.foto.findUniqueOrThrow({
    where: {id},
    include: {
      gebruiker: {
        select: {
          voornaam: true,
          familienaam: true,
          groep: {
            select: {
              naam: true
            },
          }
        },
      },
    },
  })
}

/**
 * Foto verwijderen
 */
export async function deletePhoto(id: string): Promise<void> {
  await prismaClient.foto.delete({where: {id}})
}

/**
 * Foto aanpassen
 */
export async function updatePhoto(photo: Prisma.FotoUpdateInput & {id: string}): Promise<Foto> {
  return await prismaClient.foto.update({where: {id: photo.id}, data: photo})
}