'use server'
import DAL from '@dal'
import {revalidatePath} from 'next/cache'
import {createGroupSchema, updateGroupSchema} from '@schemas'
import {ActionResponse} from '@/lib/models/actions'
import {formAction, getSessionProfileAndOptionallyRenew} from '@mediators'
import {redirect} from 'next/navigation'

/**
 * Nieuwe groep
 */
export async function createGroup(_prevState: ActionResponse, formData: FormData): Promise<ActionResponse> {
  return formAction(createGroupSchema, formData, async (data, profile) => {
    if (profile.role?.name !== 'admin') {
      return {
        success: false,
        message: "Je hebt geen rechten om een groep aan te maken.",
      };
    }

    await DAL.createGroup(data)
    revalidatePath('/groepen')
  })
}

/**
 * Groep verwijderen
 */
export async function deleteGroup(id: string): Promise<void> {
  const profile = await getSessionProfileAndOptionallyRenew()
  if (profile.role?.name == 'admin') {
    await DAL.deleteGroup(id)
  }
  revalidatePath('/groepen')
}

/**
 * Groep aanpassen
 **/
export async function updateGroup(_prevAction: ActionResponse, formData: FormData): Promise<ActionResponse> {
  return formAction(updateGroupSchema, formData, async (data, profile) => {
    if (profile.role?.name == 'admin') {
      await DAL.updateSchool(data)
    }
    redirect(`/groepen/${data.id}`)
  })
}