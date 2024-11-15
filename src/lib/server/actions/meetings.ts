'use server'

import DAL from '@dal'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {ActionResponse} from '@/lib/models/actions'
import {createMeetingSchema, updateMeetingSchema} from '@schemas'
import {formAction, getSessionProfileAndOptionallyRenew} from '@mediators'

/**
 * Create a new meeting.
 */
export async function createMeeting(_prevState: ActionResponse, formData: FormData): Promise<ActionResponse> {
  return formAction(createMeetingSchema, formData, async (data, profile) => {
    const updateData = data.contact
      ? {...data, contact: data.contact}
      : {
          ...data,
          contact: {firstName: data.firstName!, lastName: data.lastName},
          firstName: undefined,
          lastName: undefined,
        }
    await DAL.createMeeting(profile.id, updateData)
    revalidatePath('/meetings')
  })
}

/**
 * Update a meeting
 */
export async function updateMeeting(_prevState: ActionResponse, formData: FormData): Promise<ActionResponse> {
  return formAction(updateMeetingSchema, formData, async (data, profile) => {
    const updateData = data.contact
      ? {...data, contact: data.contact}
      : {
          ...data,
          contact: {firstName: data.firstName!, lastName: data.lastName},
          firstName: undefined,
          lastName: undefined,
        }
    await DAL.updateMeeting(profile.id, updateData)
    redirect('/meetings')
  })
}

/**
 * Delete a meeting.
 *
 * @param id The id of the meeting to delete.
 */
export async function deleteMeeting(id: string): Promise<void> {
  const profile = await getSessionProfileAndOptionallyRenew()
  await DAL.deleteMeeting(profile.id, id)
  redirect('/meetings')
}
