import { NextResponse } from 'next/server'

import DAL from '@/lib/server/dal'

import { verifyPassword } from '@/lib/server/utils'
import { validateSchema } from '@/lib/server/utils/actionUtils'
import { wrapper } from '@/lib/server/utils/apiWrapper'
import { createJwtToken } from '@/lib/server/utils/jwtUtils'
import {loginSchema} from '@schemas'

export const POST = wrapper(async (request): Promise<NextResponse> => {
  const { errors, data } = validateSchema(loginSchema, await request.json())

  if (errors) return new NextResponse(JSON.stringify(errors), {status: 400 })

  //Login logica
  const user = await DAL.getUserByEmail(data?.email)
  if (!user) throw new Error("Unauthorized")

  const isValidPassword = verifyPassword(user.password, data.password)

  if (!isValidPassword) throw new Error("Unauthorized")

  const token = createJwtToken(user);
  return new NextResponse(JSON.stringify({ token }), {
    status: 200
  })
}, false);