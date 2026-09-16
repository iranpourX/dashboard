import db from "@/db"
import {otpCodes} from "@/db/schema"
import {and, eq} from "drizzle-orm"

export async function findOtp(phone: string, hash: string) {
    return db.query.otpCodes.findFirst({
        where: and(eq(otpCodes.phone, phone),
            eq(otpCodes.code, hash)
        )
    })
}