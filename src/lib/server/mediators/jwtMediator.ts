import {NextRequest} from 'next/server'
import { TokenBody, validateJwtToken } from '../utils/jwtUtils';

export const validateAuthRequest = async (request: NextRequest): Promise<TokenBody> => {
    const [_, token] = (request.headers.get("authorization") || " ").split(" ");

    if (!token) {
        throw Error("Unauthorized");
    }
    
    try {
        const user = await validateJwtToken(token);
        return user;
    } catch (ex) {
        console.error("Validating JWT token failed", ex);
        throw Error("Unauthorized");
    }
}