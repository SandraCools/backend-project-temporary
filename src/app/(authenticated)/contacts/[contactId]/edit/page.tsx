import {FunctionComponent} from 'react'
import {getContact} from '@dal'
import ContactDetailForm from '@/app/(authenticated)/contacts/[contactId]/edit/contactDetailForm'
import {getSessionProfileOrRedirect} from '@mediators'

interface ContactEditPageProps {
  params: Promise<{
    contactId: string
  }>
}

const ContactEditPageProps: FunctionComponent<ContactEditPageProps> = async ({params}) => {
  const profile = await getSessionProfileOrRedirect()
  const {contactId} = await params
  const contact = await getContact(profile.id, contactId)

  return <ContactDetailForm {...contact} />
}

export default ContactEditPageProps
