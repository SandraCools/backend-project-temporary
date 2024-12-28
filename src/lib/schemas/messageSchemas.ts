//KLAAR

import {z} from "zod";

export const messageSchema = z.object({
  id: z.string().uuid(),
  onderwerp: z.string().max(255, {message: 'Het onderwerp is te lang.'}),
  bericht: z.string(),
  verzondenOp: z.date().default(() => new Date()),  //Automatisch de huidige datum
  gelezen: z.boolean(),
  verzenderId: z.string().uuid(),
  ontvangerIds: z.array(z.string().uuid())
    .min(1, { message: "Er moet minimaal één ontvanger zijn." })
})

export const createMessageSchema
  = messageSchema.omit({id: true, verzenderId: true, verzondenOp: true})

export const updateMessageSchema = messageSchema.pick({id: true, gelezen: true})