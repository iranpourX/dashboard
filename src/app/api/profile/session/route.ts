import {NextRequest, NextResponse} from "next/server"
import {and, eq} from "drizzle-orm"
import db from "@/db"
import {sessions} from "@/db/schema"
import {validateSession} from "@/lib/sessions/validate-session"
import {response} from "@/utils/utils";

export async function DELETE(req: NextRequest) {

    const currentSession = await validateSession();
    if (!currentSession) {
        return NextResponse.json(response('Unauthorized', 401), {status: 401})
    }

    const searchParams = req.nextUrl.searchParams
    const id = searchParams.get('id')

    if (id === currentSession.sessionId) {
        return NextResponse.json(response('Cannot delete current session', 400), {status: 400})
    }

    await db.delete(sessions)
        .where(and(eq(sessions.id, id as string),
                eq(sessions.userId, currentSession.userId),
            )
        )

    return NextResponse.json(response('Deleted Successfully', 200), {status: 200});
}