import {NextRequest, NextResponse} from 'next/server'
import DAL from '@dal'
import {validateAuthRequest} from '@/lib/server/mediators/jwtMediator'

//Lijst van ontvangen berichten opvragen
export async function GET(request: NextRequest): Promise<NextResponse> {
  const user = await validateAuthRequest(request);
  const berichten = await DAL.getMessagesInbox(user.id)

  // 200 OK response
  return new NextResponse(JSON.stringify(berichten), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    }
  })
}