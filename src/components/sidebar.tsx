"use client";

import {useState} from "react"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {cn} from "@/utils/utils"
import Image from "next/image"
import {IconChevronDown, IconLayoutDashboard, IconUserCircle, IconUsers} from '@tabler/icons-react'

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false)
    const [selected, setSelected] = useState<string>("Dashboard")
    const nav = usePathname()

    const toggleMenu = (menu: string) => {
        setSelected((prev) => (prev === menu ? "" : menu))
    }

    return (
        <aside
            className={cn(
                "sidebar fixed top-0 left-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-auto border-l border-gray-200 bg-white px-5 transition-all duration-300 xl:static xl:translate-x-0 dark:border-gray-800 dark:bg-black -translate-x-full",
            )}
        >
            {/* Header */}
            <div
                className={cn(
                    "flex items-center gap-2 pb-7 pt-8",
                    collapsed ? "justify-center" : "justify-between"
                )}
            >
                <Link href="/dashboard">
                    {!collapsed ? (
                        <div className="flex items-center gap-2">
                            <Image
                                src="/images/logo/logo.svg"
                                alt="Logo"
                                width={120}
                                height={32}
                                className="dark:hidden"
                            />
                            <Image
                                src="/images/logo/logo-dark.svg"
                                alt="Logo"
                                width={120}
                                height={32}
                                className="hidden dark:block"
                            />
                        </div>
                    ) : (
                        <Image
                            src="/images/logo/logo-icon.svg"
                            alt="Logo"
                            width={40}
                            height={40}
                        />
                    )}
                </Link>
            </div>

            {/* Menu */}
            <div className="no-scrollbar flex flex-col overflow-y-auto">
                <nav>
                    <div>
                        <h3 className="mb-4 text-xs uppercase leading-5 text-gray-400">
                            {!collapsed ? "MENU" : "..."}
                        </h3>

                        <ul className="flex flex-col gap-1 text-sm font-medium text-gray-600">
                            {/* Dashboard */}
                            <li>
                                <Link
                                    href="/dashboard"
                                    className={cn(
                                        'group flex items-center gap-3 rounded-lg px-4 py-3 transition',
                                        nav === '/dashboard'
                                            ? 'bg-blue-100 text-blue-700 font-bold'
                                            : 'hover:bg-gray-100'
                                    )}
                                >
                                    <IconLayoutDashboard stroke={1.25} size={24}/>
                                    {!collapsed && <span>پیشخوان</span>}
                                </Link>
                            </li>

                            {/* Profile */}
                            <li>
                                <Link
                                    href="/dashboard/me"
                                    className={cn(
                                        'group flex items-center gap-3 rounded-lg px-4 py-3 transition',
                                        nav === '/dashboard/me'
                                            ? 'bg-blue-100 text-blue-700 font-bold'
                                            : 'hover:bg-gray-100',
                                    )}
                                >
                                    <IconUserCircle stroke={1.25} size={24}/>
                                    {!collapsed && <span>پروفایل</span>}
                                </Link>
                            </li>

                            {/* Users */}
                            <li>
                                <Link
                                    href="/dashboard/users"
                                    className={cn(
                                        'group flex items-center gap-3 rounded-lg px-4 py-3 transition',
                                        nav === '/dashboard/users'
                                            ? 'bg-blue-100 text-blue-700 font-bold'
                                            : 'hover:bg-gray-100',
                                    )}
                                >
                                    <IconUsers stroke={1.25} size={24}/>
                                    {!collapsed && <span>کاربران</span>}
                                </Link>
                            </li>

                            {/* Task */}
                            <li>
                                <button
                                    onClick={() => toggleMenu("Task")}
                                    className={cn(
                                        "group flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition",
                                        selected === "Task"
                                            ? "bg-brand-500 text-white"
                                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        {/*<ClipboardList size={20}/>*/}
                                        {!collapsed && <span>Task</span>}
                                    </div>

                                    {!collapsed && (
                                        <IconChevronDown
                                            size={18}
                                            className={cn(
                                                "transition-transform",
                                                selected === "Task" && "rotate-180"
                                            )}
                                        />
                                    )}
                                </button>

                                {selected === "Task" && !collapsed && (
                                    <ul className="mt-2 flex flex-col gap-1 pl-10">
                                        <li>
                                            <Link
                                                href="/task-list"
                                                className="block rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
                                            >
                                                List
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                href="/task-kanban"
                                                className="block rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
                                            >
                                                Kanban
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>

                            {/* Tables */}
                            <li>
                                <button
                                    onClick={() => toggleMenu("Tables")}
                                    className={cn(
                                        "group flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition",
                                        selected === "Tables"
                                            ? "bg-blue-50 text-white"
                                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        {/*<Table size={20}/>*/}
                                        {!collapsed && <span>Tables</span>}
                                    </div>

                                    {!collapsed && (
                                        <IconChevronDown
                                            size={18}
                                            className={cn(
                                                "transition-transform",
                                                selected === "Tables" && "rotate-180"
                                            )}
                                        />
                                    )}
                                </button>

                                {selected === "Tables" && !collapsed && (
                                    <ul className="mt-2 flex flex-col gap-1 pl-10">
                                        <li>
                                            <Link
                                                href="/basic-tables"
                                                className="block rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
                                            >
                                                Basic Tables
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                href="/data-tables"
                                                className="block rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
                                            >
                                                Data Tables
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>

                            {/* Pages */}
                            <li>
                                <button
                                    onClick={() => toggleMenu("Pages")}
                                    className={cn(
                                        "group flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition",
                                        selected === "Pages"
                                            ? "bg-brand-500 text-white"
                                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        {/*<FileText size={20}/>*/}
                                        {!collapsed && <span>Pages</span>}
                                    </div>

                                    {!collapsed && (
                                        <IconChevronDown
                                            size={18}
                                            className={cn(
                                                "transition-transform",
                                                selected === "Pages" && "rotate-180"
                                            )}
                                        />
                                    )}
                                </button>

                                {selected === "Pages" && !collapsed && (
                                    <ul className="mt-2 flex flex-col gap-1 pl-10">
                                        <li>
                                            <Link
                                                href="/faq"
                                                className="block rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
                                            >
                                                FAQ
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                href="/404"
                                                className="block rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
                                            >
                                                404 Error
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                href="/coming-soon"
                                                className="block rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
                                            >
                                                Coming Soon
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* Promo Box */}
                {!collapsed && (
                    <div
                        className="mx-auto mb-10 mt-8 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]">
                        <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                            TailAdmin Pro
                        </h3>

                        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                            Get All Dashboards and 300+ UI Elements
                        </p>

                        <a
                            href="https://tailadmin.com/pricing"
                            target="_blank"
                            rel="nofollow"
                            className="flex items-center justify-center rounded-lg bg-brand-500 p-3 text-sm font-medium text-white hover:bg-brand-600"
                        >
                            Upgrade Plan
                        </a>
                    </div>
                )}
            </div>
        </aside>
    );
}