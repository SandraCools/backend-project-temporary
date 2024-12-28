//KLAAR
import {z} from "zod";

export const citySchema = z.object({
  id: z.string().uuid(),
  naam: z.string()
    .min(3, "De naam van een gemeente moet minstens 3 tekens lang zijn.")
    .max(255, "De naam van een gemeente mag maar 255 tekens lang zijn."),
  postcode: z.string()
    .min(4, "Een geldige postcode bevat minstens 4 tekens.")
})

export const createCitySchema = citySchema.omit({id: true})
export const updateCitySchema = citySchema