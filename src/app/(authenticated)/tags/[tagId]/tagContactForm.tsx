'use client'
import {FunctionComponent, useState} from 'react'
import {Contact} from '@prisma/client'
import Combobox from '@/components/custom/combobox'
import SubmitButtonWithLoading from '@/components/custom/submitButtonWithLoading'
import Actions from '@actions'
import useServerAction from '@hooks/useServerAction'
import {useParams} from 'next/navigation'

interface TagContactFormProps {
  contacts: Contact[]
}

const TagContactForm: FunctionComponent<TagContactFormProps> = ({contacts}) => {
  const [contactId, setContactId] = useState<string | null>(null)
  const [isPending, linkContact] = useServerAction(Actions.linkTagsToContacts)
  const {tagId} = useParams<{tagId: string}>()

  return (
    <form
      className="flex gap-4"
      onSubmit={evt => {
        evt.preventDefault()
        void linkContact({contactIds: [contactId!], tagId: tagId})
      }}>
      <Combobox
        data={[
          ...contacts.map(c => ({
            label: `${c.firstName} ${c.lastName ?? ''}`,
            value: c.id,
          })),
        ]}
        onValueChange={x => {
          if (x === 'new') {
            setContactId(null)
          } else {
            setContactId(x)
          }
        }}
        label="Choose a contact"
        placeholder="John Doe"
        noResultText="No contacts found"
      />
      <SubmitButtonWithLoading
        disabled={!contactId}
        loading={isPending}
        text="Add contact to tag"
        loadingText="Adding contact to tag..."
      />
    </form>
  )
}

export default TagContactForm
