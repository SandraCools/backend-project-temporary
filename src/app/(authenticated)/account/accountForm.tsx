'use client'

import {FunctionComponent, useActionState} from 'react'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import SubmitButtonWithLoading from '@/components/custom/submitButtonWithLoading'
import Actions from '@actions'
import {Profile} from '@/lib/models/users'
import Form from '@/components/custom/form'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {updateUserSchema} from '@schemas'

const AccountForm: FunctionComponent<Profile> = profile => {
  const [actionResult, updateProfile] = useActionState(Actions.updateProfile, {success: false})
  const hookForm = useForm({
    resolver: zodResolver(updateUserSchema),
  })

  return (
    <Form
      action={updateProfile}
      hookForm={hookForm}
      actionResult={actionResult}
      id={profile.id}
      className="space-y-4 mt-4">
      <div className="grid grid-cols-2 gap-4 items-center">
        <Label htmlFor="username">Gebruikernaam</Label>
        <Input {...hookForm.register('username')} defaultValue={actionResult?.submittedData?.username ?? profile?.username} />
      </div>

      <SubmitButtonWithLoading text="Update" loadingText="Updating..." />

      <Button
        onClick={evt => {
          evt.preventDefault()
          void Actions.signOut()
        }}
        variant="destructive"
        className="w-full">
        Uitloggen
      </Button>
    </Form>
  )
}

export default AccountForm
