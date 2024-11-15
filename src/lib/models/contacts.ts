import {Contact} from '@prisma/client'

export type ContactWithInfoObject = Contact & {contactInfo: {type: string; value: string}[]}
