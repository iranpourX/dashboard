import {api} from "@/lib/axios"

export async function initCsrf() {
    await api.get("/api/csrf")
}