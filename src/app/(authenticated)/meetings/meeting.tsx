import {FunctionComponent} from 'react'
import {MeetingWithContact} from '@/lib/models/meetings'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import Link from 'next/link'
import {BookUserIcon, CalendarIcon, EditIcon} from 'lucide-react'

const Meeting: FunctionComponent<MeetingWithContact> = ({id, contactId, description, contact, title, date}) => {
  return (
    <Card className="w-[16rem]">
      <CardHeader>
        <CardTitle className="text-3xl">{title}</CardTitle>
        <CardDescription className="flex gap-2 items-center flex-row justify-between">
          <span className="flex gap-2 items-center" suppressHydrationWarning>
            <CalendarIcon size={20} /> {date.toLocaleDateString()}
          </span>
          <Link href={`/meetings/${id}`}>
            <EditIcon size={20} className="hover:cursor-pointer" />
          </Link>
        </CardDescription>
        <CardDescription className="flex gap-2 items-center">
          <BookUserIcon size={20} />
          <Link href={`/contacts/${contactId}`}>
            {contact.firstName} {contact.lastName}
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[8rem] overflow-y-auto">{description}</CardContent>
    </Card>
  )
}

export default Meeting
