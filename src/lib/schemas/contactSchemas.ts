import {string, z} from 'zod'

export const contactSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  firstName: z
    .string()
    .min(3, {message: 'The firstname must be at least 3 characters long.'})
    .max(255, {message: "The firstname can't be longer than 255 characters."}),
  lastName: z.preprocess(
    arg => (arg === '' ? undefined : arg),
    z.union([
      z
        .string()
        .min(3, {message: 'The lastname must be at least 3 characters long.'})
        .max(255, {message: "The lastname can't be longer than 255 characters."})
        .optional(),
      z.literal(null),
    ]),
  ),
  description: z.preprocess(
    arg => (arg === '' ? undefined : arg),
    z.union([
      z
        .string()
        .min(10, {message: 'The description must be at least 10 characters long.'})
        .max(255, {message: "The description can't be longer than 255 characters."})
        .optional(),
      z.literal(null),
    ]),
  ),
  avatar: z.preprocess(
    arg => (arg === '' ? undefined : arg),
    z.union([z.string().min(10).max(255).optional(), z.literal(null)]),
  ),
  contactInfo: z
    .array(
      z.object({
        type: string().min(3, {message: 'The contact type must be at least 3 characters long.'}),
        value: string().min(3, {message: 'The contact value must be at least 3 characters long.'}),
      }),
    )
    .optional(),
})

export const createContactSchema = contactSchema.omit({id: true, userId: true})
export const updateContactSchema = contactSchema.omit({userId: true})
