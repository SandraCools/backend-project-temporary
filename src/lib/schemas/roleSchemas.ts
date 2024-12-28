//KLAAR
import {z} from "zod";

export const rolSchema = z.object({
  id: z.string().uuid(),
  naam: z.string().min(3, "De naam van een rol moet minstens 3 tekens lang zijn.").max(255, "De naam van een rol mag maar 255 tekens lang zijn."),
})

export const createRolSchema = rolSchema.omit({id: true})
export const updateRolSchema = rolSchema