//KLAAR
import {z} from "zod";

export const photoSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url().max(255),
  uploadedAt: z.date(),
  gebruikerId: z.string().uuid(),
  beschrijving: z.preprocess(
    arg => (arg === '' ? undefined : arg),
    z.union([
      z
        .string()
        .max(255, {message: "De beschrijving mag maar 255 tekens bevatten."})
        .optional(),
      z.literal(null),
    ])
  ),
})

export const createPhotoSchema = photoSchema.pick({url: true, beschrijving: true})
export const updatePhotoSchema = photoSchema.pick({beschrijving: true, id: true})