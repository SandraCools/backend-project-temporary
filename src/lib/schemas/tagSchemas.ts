import {z} from 'zod'

export const tagSchema = z.object({
  id: z.string(),
  name: z.string().min(3, {message: 'The name of the tag must be at least 3 characters long'}),
})

export const createTagSchema = tagSchema.omit({id: true})
