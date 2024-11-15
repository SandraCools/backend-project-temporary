'use server'
import DAL from '@dal'
import {revalidatePath} from 'next/cache'
import {createTagSchema} from '@schemas'
import {ActionResponse} from '@/lib/models/actions'
import {formAction, getSessionProfileAndOptionallyRenew} from '@mediators'

/**
 * Create a new tag
 */
export async function createTag(_prevState: ActionResponse, formData: FormData): Promise<ActionResponse> {
  return formAction(createTagSchema, formData, async (data, profile) => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Simuleer een interne server error, de Form component handelt dit af
    // throw new Error('Internal error')

    // Simuleer een validatie error, kan voorkomen als de gebruiker de client side validatie omzeilt heeft
    // of het request in een script probeert te versturen.
    // return {success: false, errors: {'name': ['Simulated server-side validation error.']}}

    await DAL.createTag(profile.id, data)
    revalidatePath('/tags')
  })
}

/**
 * Delete a tag.
 */
export async function deleteTag(id: string): Promise<void> {
  const profile = await getSessionProfileAndOptionallyRenew()
  await DAL.deleteTag(profile.id, id)
  revalidatePath('/tags')
}

/**
 * Link one or more tags to a contact.
 *
 * @param tagId The id of the tag to link.
 * @param contactIds The ids of the contacts to link to the tag.
 */
export async function linkTagsToContacts({tagId, contactIds}: {tagId: string; contactIds: string[]}): Promise<void> {
  const profile = await getSessionProfileAndOptionallyRenew()
  await DAL.linkTagToContact(profile.id, tagId, contactIds)
  revalidatePath(`/tags/${tagId}`)
}

/**
 * Remove one or more tags from a contact.
 *
 * @param tagId The id of the tag to link.
 * @param contactIds The ids of the contacts to remove from the tag.
 */
export async function unlinkTagsFromContact({tagId, contactId}: {tagId: string; contactId: string[]}): Promise<void> {
  const profile = await getSessionProfileAndOptionallyRenew()
  await DAL.disconnectTagFromContact(profile.id, tagId, contactId)
  revalidatePath(`/tags/${tagId}`)
}
