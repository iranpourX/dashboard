import {cookies} from "next/headers"

export async function verifyCsrf(req: Request) {
    const cookie = await cookies()
    const token = cookie.get("csrf_token")?.value
    const headerToken = req.headers.get("x-csrf-token")

    return (token && headerToken && token === headerToken)
}