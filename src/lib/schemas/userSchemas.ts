import {z} from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  voornaam: z.string()
    .min(2, {message: 'De voornaam moet minstens 2 tekens lang zijn.'})
    .max(255, {message: 'De voornaam kan niet langer zijn dan 255 tekens.'}),
  familienaam: z.string()
    .min(2, {message: 'De familienaam moet minstens 2 tekens lang zijn.'})
    .max(255, {message: 'De familienaam kan niet langer zijn dan 255 tekens.'}),
  adres: z.string()
    .min(2, {message: 'Het adres moet minstens 2 tekens lang zijn.'})
    .max(255, {message: 'Het adres kan niet langer zijn dan 255 tekens.'}),
  huisnummer: z.string()
    .min(1, {message: 'Vul je huisnummer is.'})
    .max(10, {message: 'Het huisnummer kan niet langer zijn dan 10 tekens.'}),
  gemeenteId: z.string().uuid({message: 'Deze gemeente komt niet voor in de lijst.'}),
  gsmnummer: z.preprocess(
    arg => arg === '' ? undefined : arg,
    z.union([
    z.string()
      .min(10, {message: 'Voer een geldig gsm-nummer in van min. 10 tekens.'})
      .max(13, {message: 'Voer een geldig gsm-nummer in van max. 13 tekens.', })
      .nullable(),
      z.literal(null),
    ])
  ),
  schoolId: z.string().uuid({ message: 'Deze school komt niet voor in de lijst.' }),
  actief: z.boolean(),
  email: z.string()
    .min(1, {message: 'Vul een e-mailadres in.', })
    .max(255, {message: 'Het e-mailadres kan niet langer zijn dan 255 tekens.', })
    .email("Dit is geen geldig e-mailadres."),
  password: z.string()
    .min(8, {message: 'Je wachtwoord moet minstens 8 tekens lang zijn.', }),
  username: z.preprocess(
    arg => arg === '' ? undefined : arg,
    z.union([
      z
        .string()
        .optional(),
      z.literal(null),
    ])
  ),
  groepId: z.preprocess(
    arg => arg === '' ? undefined : arg,
    z.union([
      z
        .string()
        .uuid()
        .optional(),
      z.literal(null),
    ])
  ),
  roleId: z.preprocess(
    arg => arg === '' ? undefined : arg,
    z.union([
      z
        .string()
        .uuid()
        .optional(),
      z.literal(null),
    ])
  )
})

export const createUserSchema = userSchema
  .omit({id:true, username: true, roleId: true})
  .extend({passwordConfirmation: z.string(),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'Het wachtwoord komt niet overeen.',
  })

export const loginSchema = userSchema.pick({email: true, password: true})
export const updateUserSchema = userSchema.pick({username: true})