'use server'
import DAL from '@dal'
import {revalidatePath} from 'next/cache'
import {createSchoolSchema, updateSchoolSchema} from '@schemas'
import {ActionResponse} from '@/lib/models/actions'
import {formAction, getSessionProfileAndOptionallyRenew} from '@mediators'
import {redirect} from 'next/navigation'

/**
 * Nieuwe school
 */
export async function createSchool(_prevState: ActionResponse, formData: FormData): Promise<ActionResponse> {
  return formAction(createSchoolSchema, formData, async (data, profile) => {
    if (profile.role?.name !== 'admin') {
      return {
        success: false,
        message: "Je hebt geen rechten om een school aan te maken.",
      };
    }

    const schoolData = {
      naam: data.naam,
      gemeente: {
        connect: { id: data.gemeenteId },
      }
    }

    await DAL.createSchool(schoolData)
    revalidatePath('/scholen')
  })
}

/**
 * School verwijderen
 */
export async function deleteSchool(id: string): Promise<void> {
  const profile = await getSessionProfileAndOptionallyRenew()
  if (profile.role?.name == 'admin') {
    await DAL.deleteSchool(id)
  }
  revalidatePath('/scholen')
}

/**
 * School aanpassen
 **/
export async function updateSchool(_prevAction: ActionResponse, formData: FormData): Promise<ActionResponse> {
  return formAction(updateSchoolSchema, formData, async (data, profile) => {
    if (profile.role?.name == 'admin') {
      await DAL.updateSchool(data)
    }
    redirect(`/scholen/${data.id}`)
  })
}