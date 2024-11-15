/**
 * Het 'use server' directive wordt gebruikt om aan te geven dat de code in dit bestand enkel server actions bevat.
 * Server actions zijn asynchrone functies die enkel op de server uitgevoerd kunnen worden.
 * Een server action wordt automatisch geconverteerd naar HTTP endpoints door Next.js en kunnen dus aangeroepen worden
 * van op de client.
 *
 * Zodra het 'use server' directive toegevoegd wordt, mag het bestand enkel asynchrone functies exporteren.
 */
'use server'

import DAL from '@dal'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {ActionResponse} from '@/lib/models/actions'
import {createContactSchema, updateContactSchema} from '@schemas'
import {formAction, getSessionProfileAndOptionallyRenew} from '@mediators'

/**
 * Create a new contact for the currently logged-in user.
 */
export async function createContact(_prevState: ActionResponse, formData: FormData): Promise<ActionResponse> {
  return formAction(createContactSchema, formData, async (data, profile) => {
    await DAL.createContact(profile.id, data)
    revalidatePath('/contacts')
  })
}

/**
 * Delete an existing contact.
 */
export async function deleteContact(id: string): Promise<void> {
  const profile = await getSessionProfileAndOptionallyRenew()
  await DAL.deleteContact(profile.id, id)
  redirect('/contacts')
}

/**
 * Update an existing contact.
 **/
export async function updateContact(_prevAction: ActionResponse, formData: FormData): Promise<ActionResponse> {
  return formAction(updateContactSchema, formData, async (data, profile) => {
    await DAL.updateContact(profile.id, data)
    redirect(`/contacts/${data.id}`)
  })
}
