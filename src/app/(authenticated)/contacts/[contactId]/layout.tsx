import {FunctionComponent, PropsWithChildren} from 'react'
import {Button} from '@/components/ui/button'
import {Pencil, PencilOff} from 'lucide-react'
import Link from 'next/link'

interface ContactDetailPageParams extends PropsWithChildren {
  params: Promise<{
    contactId: string
  }>
}

const DetailLayout: FunctionComponent<ContactDetailPageParams> = async ({children, params}) => {
  const {contactId} = await params
  return (
    <>
      <div className="flex flex-grow mb-4">
        <Link href={`/contacts/${contactId}`} className="w-full">
          <Button variant="outline" className="w-full">
            <PencilOff className="mr-2 h-4 w-4" />
            View
          </Button>
        </Link>
        <Link href={`/contacts/${contactId}/edit`} className="w-full">
          <Button variant="outline" className="w-full">
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </Link>
      </div>
      {children}
    </>
  )
}

export default DetailLayout
