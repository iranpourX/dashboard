import crypto from "crypto"
import {NextResponse, NextRequest} from "next/server"
import db from "@/db"
import {users, sessions} from "@/db/schema"
import {findOtp} from "@/lib/otp/find-otp"
import {deleteOtp} from "@/lib/otp/delete-otp"
import {createAccessToken} from "@/lib/jwt"
import {setAuthCookies} from "@/lib/cookie"
import {sha256} from "@/lib/hash"
import {eq} from "drizzle-orm"
import {generateCsrfToken} from "@/lib/csrf/csrf"
import {cookies} from "next/headers"

export async function POST(req: NextRequest) {
    const body = await req.json()
    const cookie = await cookies()
    const csrf = generateCsrfToken()
    try {

        const otp = await findOtp(body.phone, sha256(body.code))

        if (!otp) {
            return NextResponse.json(
                {
                    message:
                        "کد تایید نامعتبر است"
                },
                {
                    status: 400
                }
            )
        }

        if (otp.expiresAt < new Date()) {
            return NextResponse.json(
                {
                    message:
                        "کد تایید منقضی شده است"
                },
                {
                    status: 400
                }
            )
        }

        let user = await db.query.users.findFirst({
            where: eq(users.phone, body.phone)
        })

        if (!user) {
            const userId = crypto.randomUUID()
            await db.insert(users).values({
                id: userId,
                phone:
                body.phone
            })

            user = await db.query.users.findFirst({
                where: eq(users.id, userId)
            })
        }

        const sessionId = crypto.randomUUID()

        const accessToken = await createAccessToken(user!.id, sessionId)

        await db.insert(sessions).values({
            id: sessionId,
            userId: user!.id,
            userAgent: req.headers.get("user-agent"),
            ipAddress: req.headers.get("x-forwarded-for"),
            token: accessToken,
            lastActivity: new Date(),
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        })

        cookie.set('csrf_token', csrf, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/"
        })

        await setAuthCookies(accessToken)

        await deleteOtp(otp.id)

        return NextResponse.json({
            success: true
        })

    } catch (error) {
        console.error(error)

        return NextResponse.json(
            {
                message:
                    "خطا در ورود"
            },
            {
                status: 400
            }
        )
    }
}