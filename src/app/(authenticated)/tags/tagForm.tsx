'use client'
import {FunctionComponent, useActionState} from 'react'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import SubmitButtonWithLoading from '@/components/custom/submitButtonWithLoading'
import Actions from '@actions'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {createTagSchema} from '@schemas'
import {z} from 'zod'
import Form from '@/components/custom/form'
import FormError from '@/components/custom/formError'

const TagForm: FunctionComponent = () => {
  const [actionResult, createTag] = useActionState(Actions.createTag, {success: false})

  const hookForm = useForm<z.infer<typeof createTagSchema>>({
    resolver: zodResolver(createTagSchema),
  })

  return (
    <Form hookForm={hookForm} action={createTag} actionResult={actionResult}>
      <div className="grid grid-cols-2 items-end gap-4">
        <div className="col-span-1">
          <Label htmlFor="name">Title</Label>
          <Input
            {...hookForm.register('name')}
            placeholder="Work"
            defaultValue={actionResult?.submittedData?.name ?? ''}
          />
        </div>
        <div className="col-span-1 flex justify-end">
          <SubmitButtonWithLoading text="Create tag" loadingText="Creating tag..." />
        </div>
      </div>
      <FormError path="name" formErrors={hookForm.formState.errors} serverErrors={actionResult} />
    </Form>
  )
}

export default TagForm
