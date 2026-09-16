"use client"

import {api} from "@/lib/axios"
import {useMutation, useQueryClient} from "@tanstack/react-query"

export function useDeleteSession() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const res = await api.delete(`/api/profile/session?id=${id}`)

            return res.data
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                    queryKey: ["sessions"]
                }
            )
        }
    })
}