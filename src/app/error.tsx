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
        <CardTitle className="text-2xl">Something went wrong :(</CardTitle>
      </CardHeader>
      <CardContent>
        <p>We couldn't retrieve the requested information, please reload the page and try again..</p>
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
