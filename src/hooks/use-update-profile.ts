"use client"

import {api} from "@/lib/axios"
import {useMutation, useQueryClient} from "@tanstack/react-query"
import {UpdateProfileSchema} from "@/lib/validation/profile"

export function useUpdateProfile() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: UpdateProfileSchema) => {
            const res = await api.patch("/api/profile", data)

            return res.data
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                    queryKey: ["me"]
                }
            )
        }
    })
}