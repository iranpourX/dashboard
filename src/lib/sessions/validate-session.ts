import {cookies} from "next/headers"
import db from "@/db"
import {sessions, users} from "@/db/schema"
import {verifyToken} from "@/lib/jwt"
import {eq} from "drizzle-orm"
import {updateLastActivity} from "@/lib/sessions/session"

export async function validateSession() {
    const token = (await cookies()).get("access_token")?.value

    if (!token) {
        return null
    }

    try {
        const payload = await verifyToken(token)
        const session = await db.query.sessions.findFirst({
            where: eq(sessions.id, payload.sessionId)
        })

        if (!session) {
            return null
        }

        const user = await db.query.users.findFirst({
            where: eq(users.id, payload.userId)
        })

        if (!user) {
            return null
        }

        if (session.expiresAt < new Date()) {
            return null
        }

        await updateLastActivity(payload.sessionId)

        return {
            userId: payload.userId,
            sessionId: payload.sessionId,
            role: user.role
        }
    } catch {
        return null
    }
}