import db from "@/db"
import {otpCodes} from "@/db/schema"
import {eq} from "drizzle-orm"

export async function deleteOtp(otpId: string) {
    await db.delete(otpCodes).where(eq(otpCodes.id, otpId))
}