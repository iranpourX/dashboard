import {redirect} from "next/navigation"
import {validateSession} from "@/lib/sessions/validate-session"
import LoginForm from "@/components/auth/auth-form"
import {getRedirectPath} from "@/utils/role"

export default async function LoginPage() {
    const session = await validateSession()
    if (session) {
        redirect(getRedirectPath(session.role))
    }

    return (
        <div className="p-10">
            <LoginForm/>
        </div>
    )
}