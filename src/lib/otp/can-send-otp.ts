import db from "@/db"
import {otpCodes} from "@/db/schema"
import {desc, eq} from "drizzle-orm"

export async function canSendOtp(phone: string) {
    const latest = await db.query.otpCodes.findFirst({
        where: eq(otpCodes.phone, phone),
        orderBy: [desc(otpCodes.createdAt)]
    })

    if (!latest) {
        return true
    }

    const diff = Date.now() - latest.createdAt.getTime()

    return diff > 60_000
}