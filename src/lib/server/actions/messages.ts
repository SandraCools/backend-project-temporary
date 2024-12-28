import {getSessionProfileAndOptionallyRenew} from '@/lib/server/mediators'
import {Prisma} from '@prisma/client'
import DAL from '@dal'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'


/*In de DAL-laag de functies nog uitbreiden met userId*/

export async function createBericht(bericht: Prisma.BerichtCreateWithoutVerzenderInput): Promise<void> {
  const profile = await getSessionProfileAndOptionallyRenew()
  await DAL.createBericht({userId: profile.id, ...bericht})
  revalidatePath('/berichten')
}

export async function deleteBericht(id: string): Promise<void> {
  const profile = await getSessionProfileAndOptionallyRenew()
  await DAL.deleteBericht(profile.id, id)
  redirect('/berichten')
}

/*export async function updateBericht(bericht: Prisma.BerichtUpdateInput & {id: string}): Promise<void> {
  const profile = await getSessionProfileAndOptionallyRenew()
  await DAL.updateBericht(profile.id, bericht)
  redirect(`/berichten/${bericht.id}`)
}*/