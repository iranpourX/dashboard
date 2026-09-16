'use client'

import {useAuthStore} from "@/stores/auth.store"
import {PhoneStep} from "@/components/auth/phone-step"
import {VerifyStep} from "@/components/auth/verify-step"

export default function LoginPage() {
    const {step, phone} = useAuthStore()

    return (
        <div className="mx-auto max-w-md p-6">
            {step === "phone"
                ? (<PhoneStep/>)
                : (<VerifyStep phone={phone}/>)
            }
        </div>
    )
}