import {z} from 'zod'

export const meetingSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  contactId: z.string().uuid(),
  date: z.preprocess(date => (typeof date === 'string' ? new Date(date) : date), z.date()),
  description: z.string(),
})

export const createMeetingSchema = meetingSchema.omit({id: true, contactId: true}).extend({
  contact: z.preprocess(x => (x === '' ? undefined : x), z.string().uuid().optional()),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

export const updateMeetingSchema = createMeetingSchema.merge(meetingSchema.pick({id: true}))
