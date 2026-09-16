import axios from "axios"
import {getCsrfToken} from "@/lib/csrf/csrf"

export const api = axios.create({
    baseURL: process.env.URL,
    withCredentials: true
})

api.interceptors.request.use(config => {
        const csrf = getCsrfToken()

        if (csrf) {
            config.headers["x-csrf-token"] = csrf
        }

        return config
    }
)