'use client'

import {FunctionComponent, useActionState, useEffect, useState} from 'react'
import PageTitle from '@/components/custom/pageTitle'
import {Button} from '@/components/ui/button'
import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import Actions from '@actions'
import SubmitButtonWithLoading from '@/components/custom/submitButtonWithLoading'
import Form from '@/components/custom/form'
import {createContactSchema} from '@schemas'
import {useFieldArray, useForm, useWatch} from 'react-hook-form'
import FormError from '@/components/custom/formError'
import {z} from 'zod'
import LinedCircleIconButton from '@/components/custom/linedCircleIconButton'
import {Plus} from 'lucide-react'
import {zodResolver} from '@hookform/resolvers/zod'

const AddContactForm: FunctionComponent = () => {
  const [open, setOpen] = useState(false)
  const [actionResult, createContact] = useActionState(Actions.createContact, {success: false})

  const hookForm = useForm<z.infer<typeof createContactSchema>>({
    resolver: zodResolver(createContactSchema),
  })
  const contactInfo = useFieldArray({control: hookForm.control, name: 'contactInfo'})
  const contactInfoData = useWatch({name: 'contactInfo', control: hookForm.control})

  useEffect(() => {
    if (actionResult.success) {
      setOpen(false)
    }
  }, [actionResult.success])

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <PageTitle>My contacts</PageTitle>
        <Button onClick={() => setOpen(true)}>Add New Contact</Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
          </DialogHeader>
          <Form action={createContact} hookForm={hookForm} actionResult={actionResult}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Firstname</Label>
                <Input {...hookForm.register('firstName')} placeholder="John" defaultValue={actionResult?.submittedData?.firstName ?? ''}/>
                <FormError path="firstName" formErrors={hookForm.formState.errors} serverErrors={actionResult} />
              </div>
              <div>
                <Label htmlFor="lastName">Lastname</Label>
                <Input {...hookForm.register('lastName')} placeholder="Doe" defaultValue={actionResult?.submittedData?.lastName ?? ''}/>
                <FormError path="lastName" formErrors={hookForm.formState.errors} serverErrors={actionResult} />
              </div>
            </div>
            <div className="flex flex-col gap-4 my-4">
              <Label>Contactinfo</Label>

              {contactInfo.fields.map((field, index) => (
                <div className="grid grid-cols-2 gap-4" key={field.id}>
                  <div>
                    <Input
                      {...hookForm.register(`contactInfo.${index}.type`)}
                      placeholder="Contact type (e.g. email, phone)"
                      defaultValue={actionResult?.submittedData?.[`contactInfo.${index}.type`] ?? ''}
                    />
                    <FormError
                      path={`contactInfo.${index}.type`}
                      formErrors={hookForm.formState.errors}
                      serverErrors={actionResult}
                    />
                  </div>
                  <div>
                    <Input {...hookForm.register(`contactInfo.${index}.value`)}
                           placeholder="Contact info"
                           defaultValue={actionResult?.submittedData?.[`contactInfo.${index}.value`] ?? ''}
                    />
                    <FormError
                      path={`contactInfo.${index}.value`}
                      formErrors={hookForm.formState.errors}
                      serverErrors={actionResult}
                    />
                  </div>
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
            </div>

            <div className="flex justify-end">
              <SubmitButtonWithLoading loadingText="Creating contact" text="Create" />
            </div>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddContactForm
