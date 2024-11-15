'use client'
import {FunctionComponent, useActionState} from 'react'
import {Avatar, AvatarImage} from '@/components/ui/avatar'
import {Button} from '@/components/ui/button'
import Actions from '@actions'
import {Plus, Trash} from 'lucide-react'
import {Textarea} from '@/components/ui/textarea'
import {Input} from '@/components/ui/input'
import LinedCircleIconButton from '@/components/custom/linedCircleIconButton'
import SubmitButtonWithLoading from '@/components/custom/submitButtonWithLoading'
import {ContactWithInfoObject} from '@/lib/models/contacts'
import {useFieldArray, useForm, useWatch} from 'react-hook-form'
import {z} from 'zod'
import {createContactSchema} from '@schemas'
import {zodResolver} from '@hookform/resolvers/zod'
import Form from '@/components/custom/form'
import FormError from '@/components/custom/formError'

const ContactDetailForm: FunctionComponent<ContactWithInfoObject> = contact => {
  const [actionResult, createContact] = useActionState(Actions.updateContact, {success: false})

  const hookForm = useForm<z.infer<typeof createContactSchema>>({
    // We gebruiken hier de defaultValues omdat de useFieldArray hook anders niet correct geïnitialiseerd wordt.
    defaultValues: {...contact},
    resolver: zodResolver(createContactSchema),
  })
  const contactInfo = useFieldArray({control: hookForm.control, name: 'contactInfo'})
  const contactInfoData = useWatch({name: 'contactInfo', control: hookForm.control})

  return (
    <Form action={createContact} hookForm={hookForm} id={contact.id}>
      <div className="flex items-center">
        <Avatar className="h-18 w-18">
          <AvatarImage src={contact.avatar ?? `https://ui-avatars.com/api/?name=${contact.firstName}`} />
        </Avatar>
        <div className="text-4xl ms-4 flex-grow">
          <div className="flex gap-4 me-4">
            <div className="flex-grow">
              <Input
                {...hookForm.register('firstName')}
                placeholder="John"
                defaultValue={actionResult?.submittedData?.firstName ?? contact.firstName}
              />
              <FormError path="firstName" formErrors={hookForm.formState.errors} serverErrors={actionResult} />
            </div>
            <div className="flex-grow">
              <Input
                {...hookForm.register('lastName')}
                placeholder="Doe"
                defaultValue={actionResult?.submittedData?.lastName ?? contact.lastName ?? ''}
              />
              <FormError path="lastName" formErrors={hookForm.formState.errors} serverErrors={actionResult} />
            </div>
          </div>
        </div>
      </div>

      <div className="text-muted-foreground my-4">
        <Textarea {...hookForm.register('description')} />
      </div>

      <div className="text-xl">Contactinfo</div>

      {contactInfo.fields.map((field, index) => (
        <div className="flex gap-4 my-4" key={field.id}>
          <div className="w-full">
            <Input {...hookForm.register(`contactInfo.${index}.type`)} placeholder="Contact type (e.g. email, phone)" />
            <FormError
              path={`contactInfo.${index}.type`}
              formErrors={hookForm.formState.errors}
              serverErrors={actionResult}
            />
          </div>
          <div className="w-full">
            <Input {...hookForm.register(`contactInfo.${index}.value`)} placeholder="Contact info" />
            <FormError
              path={`contactInfo.${index}.value`}
              formErrors={hookForm.formState.errors}
              serverErrors={actionResult}
            />
          </div>
          <Button
            variant="ghost"
            onClick={evt => {
              evt.preventDefault()
              contactInfo.remove(index)
            }}>
            <Trash />
          </Button>
        </div>
      ))}

      <LinedCircleIconButton
        Icon={Plus}
        disabled={contactInfoData?.at(-1)?.type === '' || contactInfoData?.at(-1)?.value === ''}
        onClick={evt => {
          evt.preventDefault()
          contactInfo.append({type: '', value: ''})
        }}
      />

      <div className="flex flex-col gap-4 mt-4">
        <SubmitButtonWithLoading loadingText="Updating contact..." text="Update contact" />
        <Button
          variant="destructive"
          className="w-full"
          onClick={evt => {
            // Prevent the form from submitting.
            evt.preventDefault()
            void Actions.deleteContact(contact.id)
          }}>
          Delete contact
        </Button>
      </div>
    </Form>
  )
}

export default ContactDetailForm
