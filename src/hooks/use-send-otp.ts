import {useMutation} from "@tanstack/react-query"
import axios from "axios"

export function useSendOtp() {
    return useMutation({
        mutationFn: async (phone: string) => {
            const {data} = await axios.post("/api/auth/otp/send", {phone})

            return data
        }
    })
}