'use server'
import DAL from '@dal'
import {revalidatePath} from 'next/cache'
import {createCitySchema, updateCitySchema} from '@schemas'
import {ActionResponse} from '@/lib/models/actions'
import {formAction, getSessionProfileAndOptionallyRenew} from '@mediators'
import {redirect} from 'next/navigation'

/**
 * Nieuwe gemeente
 */
export async function createCity(_prevState: ActionResponse, formData: FormData): Promise<ActionResponse> {
  return formAction(createCitySchema, formData, async (data, profile) => {
    if (profile.role?.name !== 'admin') {
      return {
        success: false,
        message: "Je hebt geen rechten om een gemeente aan te maken.",
      };
    }
    await DAL.createCity(data)
    revalidatePath('/gemeentes')
  })
}

/**
 * Gemeente verwijderen
 */
export async function deleteCity(id: string): Promise<void> {
  const profile = await getSessionProfileAndOptionallyRenew()
  if (profile.role?.name == 'admin') {
    await DAL.deleteCity(id)
  }
  revalidatePath('/gemeentes')
}

/**
 * Gemeente aanpassen
 **/
export async function updateCity(_prevAction: ActionResponse, formData: FormData): Promise<ActionResponse> {
  return formAction(updateCitySchema, formData, async (data, profile) => {
    if (profile.role?.name == 'admin') {
      await DAL.updateCity(data)
    }
    redirect(`/gemeentes/${data.id}`)
  })
}