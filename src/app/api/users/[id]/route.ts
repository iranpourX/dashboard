import {NextRequest, NextResponse} from 'next/server'
import db from "@/db";
import {eq} from "drizzle-orm";
import {users} from "@/db/schema";
import {validateSession} from "@/lib/sessions/validate-session";
import {requireRole} from "@/lib/roles/require-role";

type RouteParams = {
    params: Promise<{ id: string }>
}

export async function GET(req: NextRequest, {params}: RouteParams) {
    await validateSession()
    await requireRole(['manager', 'super_admin'])
    const {id} = await params

    const user = await db.query.users.findFirst({
        where: eq(users.id, id),
        columns: {
            password: false
        }
    })

    return NextResponse.json(user)
}