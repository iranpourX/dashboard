import {create} from "zustand"
import {persist} from "zustand/middleware"

type AuthStore = {
    phone: string
    step: "phone" | "verify"
    setPhone: (phone: string) => void
    setStep: (step: "phone" | "verify") => void
    reset: () => void
}

export const useAuthStore = create<AuthStore>()(
    persist((set) => ({
            phone: "",
            step: "phone",
            setPhone: (phone) => set({phone}),
            setStep: (step) => set({step}),
            reset: () => set({phone: "", step: "phone"})
        }),
        {
            name: "auth-store"
        }
    )
)