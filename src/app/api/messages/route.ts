import {NextRequest, NextResponse} from 'next/server'
import DAL from '@dal'
import {validateSchema} from '@mediators'
import {createMessageSchema} from '@schemas'
import {validateAuthRequest} from '@/lib/server/mediators/jwtMediator'


//Nieuw bericht aanmaken
export async function POST(request: NextRequest): Promise<NextResponse> {
 const user = await validateAuthRequest(request);

  const {errors, data} = validateSchema(createMessageSchema, await request.json())
  if (errors) {
    // 400 Bad Request response
    return new NextResponse(JSON.stringify(errors), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const userId = user.id;
  const {ontvangerIds, ...berichtData} = data
  const newMessage
    = await DAL.createMessage({ userId, ontvangerIds, ...berichtData });

  // 200 OK response
  return new NextResponse(JSON.stringify(newMessage), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}