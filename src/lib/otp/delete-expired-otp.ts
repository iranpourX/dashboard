import db from "@/db"
import {otpCodes} from "@/db/schema"

import {lt} from "drizzle-orm"

export async function deleteExpiredOtp() {
    await db.delete(otpCodes).where(lt(otpCodes.expiresAt, new Date()))
}