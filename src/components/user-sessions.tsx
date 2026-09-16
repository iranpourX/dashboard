'use client'

import {getBrowserModel, getUserOS, isOnline} from "@/utils/utils"
import Devices from "@/components/devices/devices"
import {useDeleteSession} from "@/hooks/use-delete-session"

interface Sessions {
    id: string;
    ipAddress: string | null;
    userAgent: string | null;
    lastActivity: Date;
    current: boolean;
}

export default function UserSessions(props: { sessions: Sessions[] }) {
    const {mutateAsync} = useDeleteSession()

    // // // const sessions = await authClient.listSessions()
    // const {user} = useAuthStore()
    // const [selectedSession, setSelectedSession] = useState<Session | null>(null)
    // const queryClient = useQueryClient()
    // const {data, isFetching} = useQuery<Session[]>({
    //     queryKey: ['sessions'],
    //     queryFn: async () => {
    //         const response = await fetch('/api/settings/sessions')
    //         return await response.json()
    //     }
    // })
    //
    // const open = (session: Session) => setSelectedSession(session)
    // const close = () => setSelectedSession(null)
    //
    // const {mutate: remove, isPending} = useMutation({
    //     mutationFn: async (id: string) => {
    //         const response = await fetch(`/api/settings/sessions/${id}`, {method: 'DELETE'})
    //         const result = await response.json()
    //         if (!response.ok || result.status.code !== 200) {
    //             throw new Error(result.status?.message || 'Failed to delete session')
    //         }
    //         return result
    //     },
    //     onSuccess: async (result) => {
    //         toast.success(result.status.message)
    //         setSelectedSession(null)
    //         await queryClient.invalidateQueries({queryKey: ['sessions']})
    //     },
    //     onError: (error: any) => {
    //         toast.error(error.message || 'Something went wrong')
    //     }
    // })

    const deleteSession = async (id: string) => {
        await mutateAsync(id)
    }

    return (
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="w-full">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                    نشست ها
                </h4>

                {props.sessions.map((session, index: number) => (
                    <div
                        key={index}
                        className={'py-4 px-0 sm:px-2 flex flex-row-reverse items-center gap-4 border-b last:border-none border-gray-100 dark:border-gray-700'}
                    >
                        <Devices os={getUserOS(session.userAgent)}/>

                        <div className="flex flex-col items-end ltr:items-start gap-2 text-sm font-medium">
                            <span className="flex">
                                {getBrowserModel(session.userAgent)} . {getUserOS(session.userAgent)}
                            </span>
                            <span className="flex">
                                {isOnline(session.lastActivity)} . {session.ipAddress}
                            </span>
                        </div>

                        {session.current ? null : (
                            <button onClick={() => deleteSession(session.id)}>
                                delete
                            </button>
                        )}

                    </div>
                ))}

            </div>
        </div>
    )
}