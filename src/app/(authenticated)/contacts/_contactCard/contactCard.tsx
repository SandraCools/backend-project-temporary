import {FunctionComponent} from 'react'
import {Card, CardContent, CardDescription, CardTitle} from '@/components/ui/card'
import {Avatar, AvatarImage} from '@/components/ui/avatar'
import {Button} from '@/components/ui/button'
import {ChevronRight} from 'lucide-react'
import Link from 'next/link'
import {Contact} from '@prisma/client'

const ContactCard: FunctionComponent<Contact> = ({avatar, description, firstName, lastName, id}) => {
  return (
    <Card className="my-2">
      <CardContent className="flex items-center h-full p-4 gap-4">
        <div>
          <Avatar>
            <AvatarImage src={avatar ?? `https://ui-avatars.com/api/?name=${firstName}`} />
          </Avatar>
        </div>
        <div className="flex-grow flex justify-between">
          <div>
            <CardTitle>
              {firstName} {lastName}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Link href={`/contacts/${id}`}>
            <Button variant="ghost">
              <ChevronRight size={30} />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default ContactCard
