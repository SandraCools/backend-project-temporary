/**
 * De server-only import (die geïnstalleerd moet worden via pnpm) zorgt ervoor dat de code in dit bestand enkel op de
 * server uitgevoerd kan worden.
 * Als één van de geëxporteerde functies geïmporteerd wordt in een client component of hook zal de applicatie niet
 * compileren en een foutmelding opgooien.
 */
import 'server-only'
import {Prisma} from '@prisma/client'
import {prismaClient} from './utils/prismaClient'
import {ContactWithInfoObject} from '@/lib/models/contacts'

/**
 * Create a new contact for the currently logged-in user.
 * @param userId
 * @param contact
 */
export async function createContact(
  userId: string,
  contact: Prisma.ContactCreateWithoutUserInput,
): Promise<ContactWithInfoObject> {
  const newContact = await prismaClient.contact.create({data: {...contact, user: {connect: {id: userId}}}})
  return newContact as ContactWithInfoObject
}

/**
 * Retrieve the contacts for the currently logged-in user.
 */
export async function getContacts(userId: string, contactName: string): Promise<ContactWithInfoObject[]> {
  // Wacht 1 seconde om te demonstreren hoe suspense werkt in Next.js.
  await new Promise(resolve => setTimeout(resolve, 1000))

  const contacts = await prismaClient.contact.findMany({
    where: {
      userId,
      // Naast OR kan je ook AND gebruiken, het is natuurlijk ook mogelijk om geen operator te gebruiken.
      // AND is echter overbodig tenzij je een complexe conditie aan het bouwen bent.
      // where { firstName: {contains: contactName}, lastName: {contains: contactName} } is standaard een AND.
      OR: [
        {firstName: {contains: contactName, mode: 'insensitive'}},
        {lastName: {contains: contactName, mode: 'insensitive'}},
      ],
    },
  })
  return contacts as ContactWithInfoObject[]
}

/**
 * Retrieve a single contact.
 *
 * @param userId The id of the user for whom to retrieve the contact.
 * @param id The id of the contact to retrieve.
 */
export async function getContact(userId: string, id: string): Promise<ContactWithInfoObject> {
  // De findUnique methode geeft een null terug als er geen match gevonden is.
  // De findUniqueOrThrow methode gooit een error als er geen match gevonden is.
  const contact = await prismaClient.contact.findUniqueOrThrow({where: {id, userId}})
  return contact as ContactWithInfoObject
}

/**
 * Update an existing contact.
 *
 * @param userId
 * @param contact The updated contact info.
 */
export async function updateContact(
  userId: string,
  contact: Prisma.ContactUpdateInput & {id: string},
): Promise<ContactWithInfoObject> {
  const updatedContact = await prismaClient.contact.update({where: {id: contact.id, userId}, data: contact})
  return updatedContact as ContactWithInfoObject
}

/**
 * Delete an existing contact.
 *
 * @param userId
 * @param id The id of the contact to delete.
 */
export async function deleteContact(userId: string, id: string): Promise<void> {
  await prismaClient.contact.delete({where: {id, userId}})
}
