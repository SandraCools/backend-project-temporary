import {FunctionComponent} from 'react'
import {getContact} from '@dal'
import {Avatar, AvatarImage} from '@/components/ui/avatar'
import {getSessionProfileOrRedirect} from '@mediators'

interface ContactDetailPageParams {
  params: Promise<{
    contactId: string
  }>
}

const ContactDetailPage: FunctionComponent<ContactDetailPageParams> = async ({params}) => {
  const profile = await getSessionProfileOrRedirect()
  const {contactId} = await params
  const {firstName, lastName, description, avatar, contactInfo} = await getContact(profile.id, contactId)

  return (
    <>
      <div className="flex items-center">
        <Avatar className="h-18 w-18">
          <AvatarImage src={avatar ?? `https://ui-avatars.com/api/?name=${firstName}`} />
        </Avatar>
        <div className="text-4xl ms-4 flex-grow">
          {firstName} {lastName}
        </div>
      </div>

      <div className="text-muted-foreground my-4">{description}</div>

      <div className="text-xl">Contactinfo</div>

      {contactInfo.map(({type, value}, i) => (
        <div className="flex justify-between" key={i}>
          <div>{type.substring(0, 1).toUpperCase() + type.slice(1)}</div>
          <div>{value}</div>
        </div>
      ))}
    </>
  )
}

export default ContactDetailPage
