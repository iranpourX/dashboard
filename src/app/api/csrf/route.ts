import {NextResponse} from "next/server"
import {cookies} from "next/headers"
import crypto from "crypto"

export async function GET() {
    const token = crypto.randomBytes(32).toString("hex")

    const cookie = await cookies()

    cookie.set("csrf_token", token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        path: "/"
    })

    return NextResponse.json({token})
}