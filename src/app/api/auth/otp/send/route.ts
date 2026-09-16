import {NextResponse, NextRequest} from "next/server"
import {createOtp} from "@/lib/otp/create-otp"
import {canSendOtp} from "@/lib/otp/can-send-otp"
import {storeOtp} from "@/lib/otp/store-otp"
import {deleteExpiredOtp} from "@/lib/otp/delete-expired-otp"
import {sendSMS} from "@/lib/sms"

export async function POST(req: NextRequest) {
    const body = await req.json()

    try {
        await deleteExpiredOtp()

        const allowed = await canSendOtp(body.phone)

        if (!allowed) {
            return NextResponse.json(
                {
                    message:
                        "لطفاً ۶۰ ثانیه صبر کنید"
                },
                {
                    status: 429
                }
            )
        }

        const otp = createOtp()

        await storeOtp(body.phone, otp.hash)

        await sendSMS(body.phone, otp.code)

        return NextResponse.json({
            success: true,
            message:
                "کد تایید ارسال شد"
        })

    } catch (error) {
        console.error(error)

        return NextResponse.json(
            {
                message:
                    "ارسال کد با خطا مواجه شد"
            },
            {
                status: 400
            }
        )
    }
}