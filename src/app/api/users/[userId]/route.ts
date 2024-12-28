import {NextRequest, NextResponse} from 'next/server'
import {validateSchema} from '@mediators'
import DAL from '@dal'
import {updateUserSchema} from '@schemas'

interface RouteParams {
  params: Promise<{userId: string}>
}

export async function GET(_request: NextRequest, {params}: RouteParams): Promise<NextResponse> {
  const {userId} = await params
  const user = await DAL.getUser(userId)

  // 200 OK response
  return new NextResponse(JSON.stringify(user), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function PUT(request: NextRequest, {params}: RouteParams): Promise<NextResponse> {
  const {userId} = await params
  const {errors, data} = validateSchema(updateUserSchema, await request.json())
  // 400 Bad Request response
  if (errors) return new NextResponse(JSON.stringify(errors), {status: 400})

  const updatedUser = await DAL.updateUser(userId, data)

  // 200 OK response
  return new NextResponse(JSON.stringify(updatedUser), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function DELETE(_request: NextRequest, {params}: RouteParams): Promise<NextResponse> {
  const {userId} = await params
  await DAL.deleteUser(userId)

  // 200 OK response
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
