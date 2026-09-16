import {cookies, headers} from "next/headers"

export async function validateCsrf() {
    const cookieStore = await cookies()
    const headersList = await headers()

    const csrfCookie = cookieStore.get("csrf_token")?.value
    const csrfHeader = headersList.get("x-csrf-token")

    if (!csrfCookie || !csrfHeader) {
        return false
    }

    return (csrfCookie === csrfHeader)
}