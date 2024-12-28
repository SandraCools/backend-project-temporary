import JWT from "jsonwebtoken";
import { User } from '@prisma/client'

const { JWT_SECRET } = process.env;
const TOKEN_EXPIRATION = "48h";

/*const PUBLIC_KEY_DECODED = Buffer.from(PUBLIC_KEY!, 'base64').toString('utf-8');
const PRIVATE_KEY_DECODED = Buffer.from(PRIVATE_KEY!, 'base64').toString('utf-8');*/

export interface TokenBody {
    email: string;
    id: string;
    username: string;
    iat: number;
    exp: number;
    iss: string;
    sub: string;
}

export const validateJwtToken = async (token: string) => {
    return JWT.verify(token, JWT_SECRET as string) as unknown as TokenBody;
}

export const createJwtToken = (user: User) => {
    return JWT.sign({
        email: user.email,
        id: user.id,
        username: user.username
    }, JWT_SECRET as string, { algorithm: "RS256", expiresIn: TOKEN_EXPIRATION, subject: user.email, issuer: "contacts-app" });
}