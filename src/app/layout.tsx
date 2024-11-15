import '@/assets/main.css'

import type {Metadata} from 'next'
import {FunctionComponent, PropsWithChildren} from 'react'
import Navbar from '@/app/navbar'
import {getSessionProfile} from '@mediators'

export const metadata: Metadata = {
  title: 'Les 4: Voorbeeld | Backend frameworks',
  description: 'De voorbeeldcode voor les 4 van het vak Backend frameworks.',
  authors: [
    {
      name: 'Sebastiaan Henau',
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
