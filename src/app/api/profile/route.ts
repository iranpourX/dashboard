import {NextRequest, NextResponse} from "next/server"
import {eq} from "drizzle-orm"
import db from "@/db"
import {users} from "@/db/schema"
import {validateSession} from "@/lib/sessions/validate-session"
import {verifyOrigin} from "@/lib/csrf/verify-origin"
import {response} from "@/utils/utils"
import {validateCsrf} from "@/lib/csrf/validate-csrf"

export async function PATCH(req: NextRequest) {
    const validCsrf = await validateCsrf()
    if (!validCsrf) {
        return NextResponse.json(response('Invalid CSRF', 403), {status: 403})
    }
    if (!verifyOrigin(req)) {
        return NextResponse.json(response('Invalid Origin', 403), {status: 403})
    }
    const session = await validateSession()
    if (!session) {
        return NextResponse.json(response('Unauthorized', 401), {status: 401})
    }

    const body = await req.json()

    try {
        await db.update(users)
            .set({name: body.name, email: body.email})
            .where(eq(users.id, session.userId))

        return NextResponse.json(response('Profile Updated', 200), {status: 200})
    } catch {
        return NextResponse.json(response('Internal Server Error', 500), {status: 500})
    }
}