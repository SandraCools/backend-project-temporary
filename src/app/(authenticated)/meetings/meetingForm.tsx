'use client'

import {FunctionComponent, useActionState} from 'react'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import Actions from '@actions'
import SubmitButtonWithLoading from '@/components/custom/submitButtonWithLoading'
import useServerAction from '@hooks/useServerAction'
import {Contact} from '@prisma/client'
import Combobox from '@/components/custom/combobox'
import {Textarea} from '@/components/ui/textarea'
import DatePicker from '@/components/custom/datePicker'
import {MeetingWithContact} from '@/lib/models/meetings'
import {useForm, useWatch} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {createMeetingSchema} from '@schemas'
import Form from '@/components/custom/form'
import FormError from '@/components/custom/formError'

interface AddContactFormProps {
  contacts: Contact[]
  meeting?: MeetingWithContact
}

const AddContactForm: FunctionComponent<AddContactFormProps> = ({contacts, meeting}) => {
  const [createMeetingActionResponse, createMeeting] = useActionState(Actions.createMeeting, {success: false})
  const [updateMeetingActionResponse, updateMeeting] = useActionState(Actions.updateMeeting, {success: false})
  const [isCancelling, cancelMeeting] = useServerAction(Actions.deleteMeeting)

  const hookForm = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      contact: meeting?.contactId,
      description: meeting?.description,
      title: meeting?.title,
      date: meeting?.date ?? new Date(),
    },
    resolver: zodResolver(createMeetingSchema),
  })
  const contactId = useWatch({name: 'contact', control: hookForm.control})

  const actionResult = meeting ? updateMeetingActionResponse : createMeetingActionResponse

  return (
    <>
      <Form
        className="space-y-4"
        action={meeting ? updateMeeting : createMeeting}
        hookForm={hookForm}
        id={meeting?.id}
        actionResult={actionResult}>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <Label htmlFor="title">Title</Label>
            <Input {...hookForm.register('title')} placeholder="Coffee" defaultValue={actionResult?.submittedData?.title ?? meeting?.title}/>
            <FormError path="title" formErrors={hookForm.formState.errors} serverErrors={actionResult} />
            <FormError path="id" formErrors={hookForm.formState.errors} serverErrors={actionResult} />
          </div>
          <div className="col-span-1">
            <Label>Contact</Label>
            <Combobox
              initialValue={meeting?.contactId}
              data={[
                ...contacts.map(c => ({
                  label: `${c.firstName} ${c.lastName ?? ''}`,
                  value: c.id,
                })),
                {label: 'Create new contact', value: 'new'},
              ]}
              onValueChange={x => hookForm.setValue('contact', x === 'new' ? undefined : x)}
              label="Choose a contact"
              placeholder="John Doe"
              noResultText="No contacts found"
              {...hookForm.register('contact')}
              defaultValue={actionResult?.submittedData?.contact ?? meeting?.contactId}
            />
            <FormError path="contactId" formErrors={hookForm.formState.errors} serverErrors={actionResult} />
          </div>
          <div className="col-span-1">
            <Label>Date</Label>
            <DatePicker
              onDateChange={x => hookForm.setValue('date', x ?? new Date())}
              initialValue={meeting?.date ?? new Date()}
              {...hookForm.register('date')}
            />
            <FormError path="date" formErrors={hookForm.formState.errors} serverErrors={actionResult} />
          </div>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <Label htmlFor="firstname">Contact's firstname</Label>
              <Input {...hookForm.register('firstName')} disabled={contactId !== undefined} placeholder="John" defaultValue={actionResult?.submittedData?.firstName ?? ''}/>
              <FormError path="firstName" formErrors={hookForm.formState.errors} serverErrors={actionResult} />
            </div>
            <div className="col-span-1">
              <Label htmlFor="lastname">Contact's lastname</Label>
              <Input {...hookForm.register('lastName')} disabled={contactId !== undefined} placeholder="Doe" defaultValue={actionResult?.submittedData?.lastName ?? ''}/>
              <FormError
                path="lastName"
                formErrors={hookForm.formState.errors}
                serverErrors={createMeetingActionResponse}
              />
            </div>
          </div>
          <div className="text-gray-300">Choose "Create new contact" in the contact combobox to add a new contact.</div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea rows={5} {...hookForm.register('description')} defaultValue={actionResult?.submittedData?.description ?? meeting?.description ?? ''}/>
          <FormError path="description" formErrors={hookForm.formState.errors} serverErrors={actionResult} />
        </div>

        <SubmitButtonWithLoading
          disabled={isCancelling}
          loadingText={meeting ? 'Updating contact' : 'Creating contact'}
          text={meeting ? 'Update' : 'Create'}
        />
      </Form>

      {meeting && (
        <form
          className="my-4"
          onSubmit={evt => {
            evt.preventDefault()
            void cancelMeeting(meeting.id)
          }}>
          <SubmitButtonWithLoading text="Cancel meeting" loadingText="Canceling meeting..." variant="destructive" />
        </form>
      )}
    </>
  )
}

export default AddContactForm
