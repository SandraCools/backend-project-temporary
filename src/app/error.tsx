'use client'

import {FunctionComponent} from 'react'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'
import Link from 'next/link'
import {NextError} from 'next/dist/lib/is-error'

interface AccountErrorProps {
  error: NextError
}

const AccountError: FunctionComponent<AccountErrorProps> = ({error}) => {
  return (
    <Card className="w-[80%] mx-auto mt-8 bg-destructive text-destructive-foreground">
      <CardHeader>
        <CardTitle className="text-2xl">Oeps, er ging iets mis :(</CardTitle>
      </CardHeader>
      <CardContent>
        <p>We konden de juiste informatie niet vinden. Herlaad de pagina en probeer het zo eens opnieuw.</p>
        <p>Error: {error.message}</p>
      </CardContent>
      <CardFooter>
        <Link className="hover:underline cursor-pointer" href="/public">
          Home
        </Link>
      </CardFooter>
    </Card>
  )
}

export default AccountError
