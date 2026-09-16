import {redirect} from "next/navigation"
import {requireSession} from "@/lib/sessions/require-session"
import type {Role} from "@/types/role"

export async function requireRole(roles: Role[]) {
    const session = await requireSession()

    if (!roles.includes(session.role)) {
        redirect("/403")
    }

    return session
}