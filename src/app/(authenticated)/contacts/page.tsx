import {FunctionComponent} from 'react'
import AddContactForm from '@/app/(authenticated)/contacts/addContactForm'
import {getContacts} from '@dal'
import ContactCard from '@/app/(authenticated)/contacts/_contactCard/contactCard'
import {Input} from '@/components/ui/input'
import {getSessionProfileOrRedirect} from '@mediators'

interface ContactsPageProps {
  searchParams: Promise<{
    contactName?: string
  }>
}

const ContactsPage: FunctionComponent<ContactsPageProps> = async ({searchParams}) => {
  const profile = await getSessionProfileOrRedirect()
  const {contactName} = await searchParams
  const contacts = await getContacts(profile.id, contactName ?? '')

  return (
    <>
      <div className="container mx-auto p-4 grid">
        <AddContactForm />

        <form action="/contacts" method="get">
          <Input placeholder="Search your contacts" defaultValue={contactName} name="contactName" />
        </form>

        {contacts.map(c => (
          <ContactCard {...c} key={c.id} />
        ))}
      </div>
    </>
  )
}

export default ContactsPage
