'use client'
import {FunctionComponent} from 'react'
import {Card, CardHeader, CardTitle} from '@/components/ui/card'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {ChevronRightIcon, TrashIcon} from 'lucide-react'
import useServerAction from '@hooks/useServerAction'
import Actions from '@actions'
import {useParams} from 'next/navigation'

interface CardProps {
  id: string
  firstName: string
  lastName: string | null
}

const Contact: FunctionComponent<CardProps> = ({id, lastName, firstName}) => {
  const [_, unlinkContact] = useServerAction(Actions.unlinkTagsFromContact)
  const {tagId} = useParams<{tagId: string}>()

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>
          {firstName} {lastName}
        </CardTitle>
        <div>
          <Button variant="ghost" onClick={() => unlinkContact({tagId: tagId, contactId: [id]})}>
            <TrashIcon />
          </Button>
          <Link href={`/contacts/${id}`}>
            <Button variant="ghost">
              <ChevronRightIcon />
            </Button>
          </Link>
        </div>
      </CardHeader>
    </Card>
  )
}

export default Contact
