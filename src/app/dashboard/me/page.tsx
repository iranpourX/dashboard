import {UpdateUserForm} from "@/components/update-user-form"
import Image from "next/image"
import UserSessions from "@/components/user-sessions"
import {validateSession} from "@/lib/sessions/validate-session"
import {sessions, users} from "@/db/schema"
import db from "@/db"
import {desc, eq, sql} from "drizzle-orm"
import {redirect} from "next/navigation"
import {cn} from "@/utils/utils"

export default async function Me() {
    const payload = await validateSession()

    if (payload === null) {
        redirect("/login")
    }

    const [user, userSessions] = await Promise.all([
        db.query.users.findFirst({
            where: eq(users.id, payload.userId),
            columns: {
                password: false,
            }
        }),
        db.query.sessions.findMany({
            where: eq(sessions.userId, payload.userId),
            orderBy: [desc(sessions.lastActivity)],
            extras: {
                current: sql<boolean>`
                    ${sessions.id} =
                    ${payload.sessionId}`
                    .as("current")
            }
        })
    ])

    return (
        <div className="mx-auto container p-4 pb-20 md:p-6 md:pb-6">

            <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 lg:p-6">
                <h3 className="mb-4 text-xl font-bold text-gray-800 dark:text-white/90 lg:mb-7">پروفایل</h3>

                <div className="p-4 mb-6 border border-gray-200 rounded-xl dark:border-gray-800 lg:p-6">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                        <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
                            <div className={cn(
                                `size-24 relative overflow-hidden border border-blue-500 rounded-full dark:border-gray-800`,
                                user?.avatar === null ? `bg-blue-200 flex items-center justify-center` : null
                            )}>
                                {user?.avatar === null ? (
                                    <span className="font-semibold text-xl text-blue-500">
                                        {String(user?.name).slice(0, 2)}
                                    </span>
                                ) : (
                                    <Image
                                        width={100}
                                        height={100}
                                        src={`/${user?.avatar}`}
                                        alt={`${user?.name}`}
                                    />
                                )}

                            </div>
                            <div>
                                <h4 className="mb-2 text-lg font-semibold text-right text-gray-800 dark:text-white/90">
                                    {user?.name}
                                </h4>
                                <div className="flex flex-col items-center gap-1 text-right xl:flex-row xl:gap-3">
                                    <p className="text-sm lowercase font-medium text-gray-600 dark:text-gray-400">
                                        {user?.role}
                                    </p>
                                    <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"/>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        {user?.phone}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="p-5 mb-6 border border-gray-200 rounded-xl dark:border-gray-800 lg:p-6">
                    <UpdateUserForm user={user}/>
                </div>
                <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                    <UserSessions sessions={userSessions}/>
                </div>
            </div>
        </div>
    )
}
