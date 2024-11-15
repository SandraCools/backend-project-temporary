'use client'
import {FunctionComponent} from 'react'
import {Tag as TagType} from '@prisma/client'
import {Card, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {ChevronRightIcon, TrashIcon} from 'lucide-react'
import Actions from '@actions'
import Link from 'next/link'

const Tag: FunctionComponent<TagType> = ({id, name}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{name}</CardTitle>
          <div>
            <Button variant="ghost" onClick={() => Actions.deleteTag(id)}>
              <TrashIcon className="text-destructive" />
            </Button>
            <Link href={`/tags/${id}`}>
              <Button variant="ghost">
                <ChevronRightIcon />
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}

export default Tag
