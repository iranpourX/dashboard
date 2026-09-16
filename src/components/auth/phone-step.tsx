"use client"

import {
    useForm
} from "react-hook-form"

import {
    useSendOtp
} from "@/hooks/use-send-otp"

import {
    useAuthStore
} from "@/stores/auth.store"

type FormValues = {
    phone: string
}

export function PhoneStep() {
    const {
        register,
        handleSubmit
    } =
        useForm<FormValues>()

    const sendOtp =
        useSendOtp()

    const {
        setPhone,
        setStep
    } =
        useAuthStore()

    const onSubmit = (
        values: FormValues
    ) => {
        sendOtp.mutate(
            values.phone,
            {
                onSuccess: () => {
                    setPhone(
                        values.phone
                    )

                    setStep(
                        "verify"
                    )
                }
            }
        )
    }

    return (
        <form
            onSubmit={handleSubmit(
                onSubmit
            )}
            className="space-y-4"
        >
            <input
                {...register(
                    "phone"
                )}
                placeholder="09123456789"
                className="w-full rounded-lg border p-3"
            />

            <button
                type="submit"
                className="w-full rounded-lg bg-black p-3 text-white"
            >
                ارسال کد
            </button>
        </form>
    )
}