import '@/assets/main.css'

import type {Metadata} from 'next'
import {FunctionComponent, PropsWithChildren} from 'react'
import Navbar from '@/app/navbar'
import {getSessionProfile} from '@mediators'

export const metadata: Metadata = {
  title: 'wHAjo',
  description: 'Online portaal van jongerenpastoraal wHAjo',
  authors: [
    {
      name: 'Sandra Cools',
    },
  ],
}

const RootLayout: FunctionComponent<PropsWithChildren> = async ({children}) => {
  const profile = await getSessionProfile()
  return (
    <html lang="en">
      <body className="h-[100vh]">
        <Navbar profile={profile}>{children}</Navbar>
      </body>
    </html>
  )
}

export default RootLayout
