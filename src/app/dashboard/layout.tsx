import {ReactNode} from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import {requireRole} from "@/lib/roles/require-role"
import {requireSession} from "@/lib/sessions/require-session";

export default async function DashboardLayout({children}: Readonly<{
    children: ReactNode;
}>) {
    await requireSession()
    await requireRole([
        "manager",
        "super_admin"
    ])
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar/>
            <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
                <Header/>
                <main>{children}</main>
            </div>
        </div>
    )
}