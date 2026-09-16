import {redirect} from "next/navigation"
import {validateSession} from "./validate-session"

export async function requireSession() {
    const session = await validateSession()

    if (!session) {
        redirect("/login")
    }

    return session
}