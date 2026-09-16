import db from "@/db"
import {users, sessions} from "@/db/schema"
import {eq, desc} from "drizzle-orm"
import {requireSession} from "@/lib/sessions/require-session";

export default async function DashboardPage() {
    const session = await requireSession()

    const user = await db.query.users.findFirst({
        where: eq(users.id, session.userId),
    })

    const activeSessions = await db.query.sessions.findMany({
        where: eq(sessions.userId, user?.id as string),
        orderBy: [desc(sessions.lastActivity)]
    })

    return (
        <div className="max-w-5xl mx-auto p-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Dashboard
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Welcome back{" "}
                        {user?.name}
                    </p>
                </div>

                {/*<LogoutButton />*/}
            </div>

            <div className="grid grid-cols-3 gap-6 mt-10">
                <div className="border rounded-xl p-6">
                    <h2 className="text-lg font-semibold">
                        Name
                    </h2>

                    <p className="mt-2">
                        {user?.name}
                    </p>
                </div>

                <div className="border rounded-xl p-6">
                    <h2 className="text-lg font-semibold">
                        Email
                    </h2>

                    <p className="mt-2">
                        {user?.email}
                    </p>
                </div>

                <div className="border rounded-xl p-6">
                    <h2 className="text-lg font-semibold">
                        Sessions
                    </h2>

                    <p className="mt-2">
                        {activeSessions.length}
                    </p>
                </div>
            </div>

            <div className="mt-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                        Active Sessions
                    </h2>
                </div>

                <div className="mt-6 flex flex-col gap-4">
                    {activeSessions.map((session) => (
                        <div key={session.id} className="border rounded-xl p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">
                                        {session.userAgent}
                                    </p>

                                    <p className="text-sm text-gray-500 mt-1">
                                        IP:
                                        {" "}
                                        {session.ipAddress}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-sm">
                                        Last Activity
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {new Date(session.lastActivity,).getTime()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}