import {FunctionComponent} from 'react'
import ContactCardSkeleton from '@/app/(authenticated)/contacts/_contactCard/contactCardSkeleton'
import AddContactForm from '@/app/(authenticated)/contacts/addContactForm'
import {Input} from '@/components/ui/input'

const Loading: FunctionComponent = () => {
  return (
    <>
      <div className="container mx-auto p-4 grid">
        <div>
          <AddContactForm />

          <form action="/contacts" method="get">
            <Input placeholder="Search your contacts" name="contactName" />
          </form>

          {Array(10)
            .fill(10)
            .map((_, i) => (
              <ContactCardSkeleton key={i} />
            ))}
        </div>
      </div>
    </>
  )
}

export default Loading
