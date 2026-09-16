import {eq} from "drizzle-orm"
import db from "@/db"
import {sessions} from "@/db/schema"

export async function createSession(data: {
    sessionId: string;
    userId: string;
    token: string;
    userAgent?: string;
    ipAddress?: string;
}) {
    await db.insert(sessions).values({
        id: data.sessionId,
        userId: data.userId,
        token: data.token,
        userAgent: data.userAgent,
        ipAddress: data.ipAddress,
        lastActivity: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now())
    })
}

export async function updateLastActivity(sessionId: string) {
    await db.update(sessions).set({lastActivity: new Date()})
        .where(eq(sessions.id, sessionId))
}

export async function getSession(sessionId: string) {
    return db.query.sessions.findFirst({
        where: eq(sessions.id, sessionId)
    })
}
