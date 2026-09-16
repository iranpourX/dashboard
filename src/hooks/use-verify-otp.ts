// hooks/auth/use-verify-otp.ts

import {useMutation}
    from "@tanstack/react-query"

import axios from "axios"

export function useVerifyOtp() {
    return useMutation({
        mutationFn: async (
            values: {
                phone: string
                code: string
            }
        ) => {
            const {data} = await axios.post("/api/auth/otp/verify", values)

            return data
        }
    })
}