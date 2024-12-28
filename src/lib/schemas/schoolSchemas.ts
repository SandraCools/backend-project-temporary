//KLAAR
import {z} from 'zod'

export const schoolSchema = z.object({
  id: z.string(),
  naam: z.string().min(3, {message: 'De naam van een school moet minstens 3 tekens lang zijn.'}),
  gemeenteId: z.string().uuid()
})

export const createSchoolSchema = schoolSchema.omit({id: true})
export const updateSchoolSchema = schoolSchema
