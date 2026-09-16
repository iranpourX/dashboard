import crypto from "crypto"
import db from "@/db"
import {otpCodes} from "@/db/schema"

export async function storeOtp(phone: string, hash: string) {
    await db.insert(otpCodes).values({
        id: crypto.randomUUID(),
        phone,
        code: hash,
        expiresAt: new Date(Date.now() + 2 * 60 * 1000)
    })
}