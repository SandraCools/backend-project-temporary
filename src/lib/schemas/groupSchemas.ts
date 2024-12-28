//KLAAR
import {z} from 'zod'

export const groupSchema = z.object({
  id: z.string(),
  naam: z.string().min(3, {message: 'Een groepsnaam moet minstens 3 tekens lang zijn.'}),
})

export const createGroupSchema = groupSchema.omit({id: true})
export const updateGroupSchema = groupSchema