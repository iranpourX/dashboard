import {SignJWT, jwtVerify} from "jose"

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function createAccessToken(userId: string, sessionId: string) {
    return await new SignJWT({userId, sessionId})
        .setProtectedHeader({alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime("30d")
        .sign(secret)
}

export async function verifyToken(token: string) {
    const {payload} = await jwtVerify(token, secret)

    return payload as {
        userId: string
        sessionId: string
        type?: string
    }
}