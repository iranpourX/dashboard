import {cookies} from "next/headers"

export async function setAuthCookies(accessToken: string) {
    const cookieStore = await cookies()

    cookieStore.set("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 30 * 24
    })
}

export async function clearAuthCookies() {
    const cookieStore = await cookies()

    cookieStore.delete("access_token")
}