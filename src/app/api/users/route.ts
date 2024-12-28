import {NextRequest, NextResponse} from 'next/server'
import DAL from '@dal'
import {validateSchema} from '@mediators'
import {createUserSchema} from '@schemas'

//Lijst van gebruikers opvragen
export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams
  const contactName = searchParams.get('name') ?? ''
  const users = await DAL.getUsers(contactName)

  // 200 OK response
  return new NextResponse(JSON.stringify(users), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

//Nieuwe gebruiker aanmaken
export async function POST(request: NextRequest): Promise<NextResponse> {
  const {errors, data} = validateSchema(createUserSchema, await request.json())

  if (errors) {
    // 400 Bad Request response
    return new NextResponse(JSON.stringify(errors), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const newContact = await DAL.createUser(data)

  // 200 OK response
  return new NextResponse(JSON.stringify(newContact), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}