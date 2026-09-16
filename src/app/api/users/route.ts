import {NextResponse} from "next/server";
import db from "@/db";
import {requireSession} from "@/lib/sessions/require-session"
import {requireRole} from "@/lib/roles/require-role";

export async function GET() {
    await requireSession()
    await requireRole(['manager', 'super_admin'])
    const users = await db.query.users.findMany()

    return NextResponse.json(users)
}