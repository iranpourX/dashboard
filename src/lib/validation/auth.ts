import {z} from "zod"

export const sendOtpSchema = z.object({
    phone: z.string().trim().min(11).max(11).regex(
        /^09\d{9}$/,
        "شماره موبایل نامعتبر است"
    )
})

export const verifyOtpSchema = z.object({
    code: z.string().trim().length(6, "کد تایید باید ۶ رقم باشد")
})

export type PhoneInput = z.infer<typeof sendOtpSchema>
export type verifyInput = z.infer<typeof verifyOtpSchema>