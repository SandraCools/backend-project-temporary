'use client'

import {FunctionComponent, useActionState, useState} from 'react'
import PageTitle from '@/components/custom/pageTitle'
import {Button} from '@/components/ui/button'
import {cn} from '@/lib/utils'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import SubmitButtonWithLoading from '@/components/custom/submitButtonWithLoading'
import Actions from '@actions'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {createUserSchema, loginSchema} from '@schemas'
import Form from '@/components/custom/form'
import FormError from '@/components/custom/formError'

const LoginForm: FunctionComponent = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false)
  const [actionResponse, signInOrRegister] = useActionState(Actions.signInOrRegister, {success: false})
  const form = useForm({
    resolver: zodResolver(isSignUp ? createUserSchema : loginSchema),
    defaultValues: {
      email: '',
      username: isSignUp ? '' : undefined,
      password: '',
      passwordConfirmation: isSignUp ? '' : undefined,
    },
  })

  return (
    <div className="flex flex-col justify-center">
      <div className="mb-4">
        <PageTitle>My contacts</PageTitle>
        <p>Log in to your existing account or create a new one with a real or fake email-address.</p>
      </div>

      <div className="flex flex-row justify-between mb-4">
        <Button variant="link" className={cn('p-0 text-xl', {underline: !isSignUp})} onClick={() => setIsSignUp(false)}>
          Sign in
        </Button>
        <Button variant="link" className={cn('p-0 text-xl', {underline: isSignUp})} onClick={() => setIsSignUp(true)}>
          Sign up
        </Button>
      </div>

      <div className="mt-4">
        <Form hookForm={form} action={signInOrRegister} actionResult={actionResponse}>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              {...form.register('email')}
              placeholder="Email"
              defaultValue={actionResponse?.submittedData?.email ?? ''}
            />
            <FormError path="email" formErrors={form.formState.errors} serverErrors={actionResponse} />
          </div>

          {isSignUp && (
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                {...form.register('username')}
                placeholder="Username"
                defaultValue={actionResponse?.submittedData?.username ?? ''}
              />
              <FormError path="username" formErrors={form.formState.errors} serverErrors={actionResponse} />
            </div>
          )}

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              {...form.register('password')}
              placeholder="Password"
              type="password"
              defaultValue={actionResponse?.submittedData?.password ?? ''}
            />
            <FormError path="password" formErrors={form.formState.errors} serverErrors={actionResponse} />
          </div>

          {isSignUp && (
            <div>
              <Label htmlFor="passwordConfirmation">Confirm your password</Label>
              <Input
                {...form.register('passwordConfirmation')}
                placeholder="Confirm you password"
                type="password"
                defaultValue={actionResponse?.submittedData?.passwordConfirmation ?? ''}
              />
              <FormError path="passwordConfirmation" formErrors={form.formState.errors} serverErrors={actionResponse} />
            </div>
          )}

          <SubmitButtonWithLoading
            loadingText={isSignUp ? 'Creating your account...' : 'Logging in ...'}
            text={isSignUp ? 'Sign up' : 'Log in'}
          />
        </Form>
      </div>
    </div>
  )
}

export default LoginForm
