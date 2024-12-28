import { NextRequest, NextResponse } from "next/server";

import { validateAuthRequest } from "../mediators/jwtMediator";
import { TokenBody } from "./jwtUtils";

export type WrapperFnSignature = (request: NextRequest, context: { tokenBody?: TokenBody }) => Promise<NextResponse>;

export const wrapper = (targetFn: WrapperFnSignature, authenticated = true) => async (request: NextRequest) => {
  let response: NextResponse;

  try {
    let tokenBody: TokenBody | undefined = undefined;
    if (authenticated) {
      tokenBody = await validateAuthRequest(request);
    }
    
    response = await targetFn(request, { tokenBody });
  } catch (ex) {
    if ((ex as Error).message === "Unauthorized") {
      response = new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      })
    } else {
      throw ex;
    }
  }

  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set("content-type", "application/json")

  if (request.method === 'OPTIONS') {
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  }

  return response;
}