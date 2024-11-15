import {FunctionComponent} from 'react'
import LoginForm from '@/app/login/loginForm'
import {redirect} from 'next/navigation'
import {getSessionProfile} from '@mediators'

const AuthenticationPage: FunctionComponent = async () => {
  const profile = await getSessionProfile()

  if (profile) {
    redirect('/contacts')
  }

  return <LoginForm />
}

export default AuthenticationPage
