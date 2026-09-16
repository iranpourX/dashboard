"use client"

import {useQuery} from "@tanstack/react-query"
import {api} from "@/lib/axios"

export function useMe() {
    return useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            const response = await api.get("/api/auth/me")

            return response.data
        }
    })
}