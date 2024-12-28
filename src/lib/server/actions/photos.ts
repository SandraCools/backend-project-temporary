'use server'
import DAL, {getPhoto} from '@dal'
import {revalidatePath} from 'next/cache'
import {createPhotoSchema, updatePhotoSchema, updateSchoolSchema} from '@schemas'
import {ActionResponse} from '@/lib/models/actions'
import {formAction, getSessionProfileAndOptionallyRenew} from '@mediators'
import {redirect} from 'next/navigation'

/**
 * Nieuwe foto
 */
export async function createPhoto(_prevState: ActionResponse, formData: FormData): Promise<ActionResponse> {
  return formAction(createPhotoSchema, formData, async (data, profile) => {
    await DAL.createPhoto({makerId: profile.id, ...data})
    revalidatePath('/fotos')
  })
}

/**
 * Foto verwijderen
 */
export async function deletePhoto(id: string): Promise<{message: string}> {
  const profile = await getSessionProfileAndOptionallyRenew()

  //Gewone gebruikers mogen enkel hun eigen foto's verwijderen.
  if (profile.role?.name == 'gebruiker') {
    const photo = await getPhoto(id)
    if (profile.id !== photo.gebruikerId){
      return {
        message: "Dit is geen foto van jou. Je kan enkel eigen foto's verwijderen.",
      };
    }
  }

  await DAL.deletePhoto(id)
  revalidatePath('/fotos')
  return {message: 'Foto verwijderd'}
}

/**
 * Foto aanpassen
 **/
export async function updatePhoto(_prevAction: ActionResponse, formData: FormData): Promise<ActionResponse> {
  return formAction(updatePhotoSchema, formData, async (data, profile) => {

    //Gewone gebruikers mogen enkel hun eigen foto's bewerken.
    if (profile.role?.name == 'gebruiker') {
      const photo = await getPhoto(data.id)
      if (profile.id !== photo.gebruikerId){
        return {
          success: false,
          message: "Dit is geen foto van jou. Je kan enkel eigen foto's bewerken.",
        };
      }
    }

    await DAL.updatePhoto(data)
    redirect(`/fotos/${data.id}`)

    return {
      success: true,
      message: "De foto is succesvol bijgewerkt.",
    };
  })
}