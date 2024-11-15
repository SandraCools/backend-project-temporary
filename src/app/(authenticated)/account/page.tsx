import {FunctionComponent} from 'react'
import PageTitle from '@/components/custom/pageTitle'
import AccountForm from '@/app/(authenticated)/account/accountForm'
import {getSessionProfileOrRedirect} from '@mediators'

const PagePage: FunctionComponent = async () => {
  const profile = await getSessionProfileOrRedirect()

  return (
    <>
      <div>
        <PageTitle>Welcome {profile.username}</PageTitle>
        <AccountForm {...profile} />
      </div>
    </>
  )
}

export default PagePage
