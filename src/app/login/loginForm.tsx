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

//TO DO: uitbreiden met andere properties van een User, in geval van registratie
// Op 2 plaatsen: defaultvalues + HTML (commentaar-stuk)

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
        <PageTitle>wHAjo!</PageTitle>
        <p>Log in met je eigen e-mailadres en wachtwoord. <br/>Nog geen lid? Registreer je!</p>
      </div>

      <div className="flex flex-row justify-between mb-4">
        <Button variant="link" className={cn('p-0 text-xl', {underline: !isSignUp})} onClick={() => setIsSignUp(false)}>
          Log in
        </Button>
        <Button variant="link" className={cn('p-0 text-xl', {underline: isSignUp})} onClick={() => setIsSignUp(true)}>
          Registreer
        </Button>
      </div>

      <div className="mt-4">
        <Form hookForm={form} action={signInOrRegister} actionResult={actionResponse}>
          <div>
            <Label htmlFor="email">E-mailadres</Label>
            <Input
              {...form.register('email')}
              placeholder="voorbeeld@mail.be"
              defaultValue={actionResponse?.submittedData?.email ?? ''}
            />
            <FormError path="email" formErrors={form.formState.errors} serverErrors={actionResponse} />
          </div>

          {/*isSignUp && (
            <div>
              <Label htmlFor="voornaam">Voornaam</Label>
              <Input
                {...form.register('voornaam')}
                placeholder="Voornaam"
                defaultValue={actionResponse?.submittedData?.voornaam ?? ''}
              />
              <FormError path="email" formErrors={form.formState.errors} serverErrors={actionResponse} />
            </div>
          )*/}

          <div>
            <Label htmlFor="password">Wachtwoord</Label>
            <Input
              {...form.register('password')}
              placeholder="Wachtwoord"
              type="password"
              defaultValue={actionResponse?.submittedData?.password ?? ''}
            />
            <FormError path="password" formErrors={form.formState.errors} serverErrors={actionResponse} />
          </div>

          {isSignUp && (
            <div>
              <Label htmlFor="passwordConfirmation">Bevestig je wachtwoord</Label>
              <Input
                {...form.register('passwordConfirmation')}
                placeholder="Typ hetzelfde wachtwoord hier nog eens"
                type="password"
                defaultValue={actionResponse?.submittedData?.passwordConfirmation ?? ''}
              />
              <FormError path="passwordConfirmation" formErrors={form.formState.errors} serverErrors={actionResponse} />
            </div>
          )}

          <SubmitButtonWithLoading
            loadingText={isSignUp ? 'We maken je account nu aan...' : 'Je wordt nu ingelogd ...'}
            text={isSignUp ? 'Registreer' : 'Log in'}
          />
        </Form>
      </div>
    </div>
  )
}

export default LoginForm
