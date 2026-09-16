"use client"

import {
    useState
} from "react"

import {
    useRouter
} from "next/navigation"

import {
    OtpInput
} from "./otp-input"

import {
    useCountdown
} from "@/hooks/use-countdown"

import {
    useVerifyOtp
} from "@/hooks/use-verify-otp"

import {
    useSendOtp
} from "@/hooks/use-send-otp"

import {
    useAuthStore
} from "@/stores/auth.store"

export function VerifyStep(
    {
        phone
    }: {
        phone: string
    }
) {
    const router =
        useRouter()

    const [code, setCode] =
        useState("")

    const verifyOtp =
        useVerifyOtp()

    const sendOtp =
        useSendOtp()

    const {
        time,
        reset
    } =
        useCountdown(60)

    const {
        setStep,
        reset: resetStore
    } =
        useAuthStore()

    const submit =
        () => {
            verifyOtp.mutate(
                {
                    phone,
                    code
                },
                {
                    onSuccess: () => {
                        resetStore()

                        router.push(
                            "/profile"
                        )
                    }
                }
            )
        }

    const resend =
        () => {
            sendOtp.mutate(
                phone,
                {
                    onSuccess: () =>
                        reset()
                }
            )
        }

    return (
        <div className="space-y-5">
            <div>
                کد ارسال شده به
                {" "}
                {phone}
            </div>

            <OtpInput
                value={code}
                onChangeAction={
                    setCode
                }
            />

            <button
                onClick={submit}
                className="w-full rounded-lg bg-black p-3 text-white"
            >
                ورود
            </button>

            <button
                onClick={() =>
                    setStep(
                        "phone"
                    )
                }
                className="w-full rounded-lg border p-3"
            >
                تغییر شماره
            </button>

            {time > 0 ? (
                <div className="text-center">
                    ارسال مجدد تا
                    {" "}
                    {time}
                    {" "}
                    ثانیه
                </div>
            ) : (
                <button
                    onClick={
                        resend
                    }
                    className="w-full rounded-lg border p-3"
                >
                    ارسال مجدد کد
                </button>
            )}
        </div>
    )
}