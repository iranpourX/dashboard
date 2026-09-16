import {NextResponse} from "next/server"
import db from "@/db"
import {users} from "@/db/schema"
import {requireSession} from "@/lib/sessions/require-session"
import {eq} from "drizzle-orm"

export async function GET() {
    const session = await requireSession()

    const user = await db.query.users.findFirst({
        where: eq(users.id, session.userId),
        columns: {
            password: false
        }
    })

    return NextResponse.json(user)
}