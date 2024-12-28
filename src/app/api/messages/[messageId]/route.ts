import {NextRequest, NextResponse} from 'next/server'
import {validateSchema} from '@mediators'
import DAL from '@dal'
import {updateMessageSchema} from '@schemas'
import {validateAuthRequest} from '@/lib/server/mediators/jwtMediator'

interface RouteParams {
  params: Promise<{messageId: string}>
}

export async function GET(_request: NextRequest, {params}: RouteParams): Promise<NextResponse> {
  const {messageId} = await params
  const message = await DAL.getMessage(messageId)

  // 200 OK response
  return new NextResponse(JSON.stringify(message), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  const {errors, data} = validateSchema(updateMessageSchema, await request.json())
  // 400 Bad Request response
  if (errors) return new NextResponse(JSON.stringify(errors), {status: 400})

  const updatedMessage = await DAL.toggleReadMessage(data)

  // 200 OK response
  return new NextResponse(JSON.stringify(updatedMessage), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function DELETE(request: NextRequest, {params}: RouteParams): Promise<NextResponse> {
  const user = await validateAuthRequest(request);
  const {messageId} = await params

  await DAL.deleteMessage(user.id, messageId)

  // 200 OK response
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
