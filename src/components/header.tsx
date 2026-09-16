"use client"

import {useState} from "react"
import Image from "next/image"
import Link from "next/link"
import {cn} from "@/utils/utils"
import {useMe} from "@/hooks/use-me"
import {ThemeToggle} from "@/components/theme-toggle"
import {Menu, MenuButton, MenuItem, MenuItems, MenuHeading} from '@headlessui/react'


export default function Header() {
    const {data: user} = useMe()

    const [menuToggle, setMenuToggle] = useState(false)
    const [sidebarToggle, setSidebarToggle] = useState(false)
    const [notificationDropdown, setNotificationDropdown] = useState(false)

    return (
        <header
            className="sticky top-0 z-99999 flex w-full border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 lg:border-b">
            <div className="flex grow flex-col items-center justify-between lg:flex-row lg:px-6 py-4">
                <div
                    className="flex w-full items-center justify-between gap-2 border-b border-gray-200 px-3 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0">
                    {/* Sidebar Toggle */}
                    <button
                        onClick={() => setSidebarToggle(!sidebarToggle)}
                        className={`z-99999 flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 lg:h-11 lg:w-11 lg:border dark:border-gray-800 ${
                            sidebarToggle
                                ? "bg-gray-100 dark:bg-gray-800 lg:bg-transparent"
                                : ""
                        }`}
                    >
                        {sidebarToggle ? (
                            <svg
                                className="fill-current lg:hidden"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="fill-current"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M3.25 6C3.25 5.58579 3.58579 5.25 4 5.25H20C20.4142 5.25 20.75 5.58579 20.75 6C20.75 6.41421 20.4142 6.75 20 6.75H4C3.58579 6.75 3.25 6.41421 3.25 6ZM3.25 18C3.25 17.5858 3.58579 17.25 4 17.25H20C20.4142 17.25 20.75 17.5858 20.75 18C20.75 18.4142 20.4142 18.75 20 18.75H4C3.58579 18.75 3.25 18.4142 3.25 18ZM4 11.25C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H12C12.4142 12.75 12.75 12.4142 12.75 12C12.75 11.5858 12.4142 11.25 12 11.25H4Z"
                                />
                            </svg>
                        )}
                    </button>

                    {/* Logo */}
                    <Link href="/" className="lg:hidden">
                        <Image
                            src="/images/logo/logo.svg"
                            alt="Logo"
                            width={120}
                            height={32}
                        />
                    </Link>

                    {/* Mobile Menu */}
                    <button
                        onClick={() => setMenuToggle(!menuToggle)}
                        className={`z-99999 flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden ${
                            menuToggle ? "bg-gray-100 dark:bg-gray-800" : ""
                        }`}
                    >
                        <svg
                            className="fill-current"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951Z"
                            />
                        </svg>
                    </button>

                    {/* Search */}
                    <div className="hidden lg:block">
                        <form>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search or type command..."
                                    className="h-11 w-107.5 rounded-lg border border-gray-200 bg-transparent py-2.5 pr-14 pl-12 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none dark:border-gray-800 dark:text-white"
                                />

                                <button
                                    type="button"
                                    className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-lg border border-gray-200 bg-gray-50 px-1.75 py-[4.5px] text-xs text-gray-500 dark:border-gray-800 dark:bg-white/[0.03]"
                                >
                                    ⌘ K
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className={cn(
                    'w-full items-center justify-between gap-4 px-5 lg:flex lg:justify-end lg:px-0',
                    menuToggle ? "flex" : "hidden"
                )}>

                    <div className="flex items-center gap-4">

                        <ThemeToggle/>

                        {/* Notification */}
                        <Menu>
                            <MenuButton className="relative flex p-2 items-center justify-center">
                                <span className="absolute top-1 right-1 size-2 rounded-full bg-orange-400"/>

                                <svg className="text-gray-600 size-6" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 448 512">
                                    <path fill="currentColor"
                                          d="M224 0c-8.8 0-16 7.2-16 16l0 16.8C127.1 40.8 64 109 64 192l0 10.3c0 45.1-15.4 88.9-43.5 124.1L10.4 339C3.7 347.4 0 357.9 0 368.6 0 394.8 21.2 416 47.4 416l353.2 0c26.2 0 47.4-21.2 47.4-47.4 0-10.8-3.7-21.2-10.4-29.6l-10.1-12.6c-28.2-35.2-43.5-79-43.5-124.1l0-10.3c0-83-63.1-151.2-144-159.2L240 16c0-8.8-7.2-16-16-16zm0 64c70.7 0 128 57.3 128 128l0 10.3c0 52.4 17.8 103.2 50.6 144.1L412.6 359c2.2 2.7 3.4 6.1 3.4 9.6 0 8.5-6.9 15.4-15.4 15.4L47.4 384c-8.5 0-15.4-6.9-15.4-15.4 0-3.5 1.2-6.9 3.4-9.6l10.1-12.6C78.2 305.5 96 254.7 96 202.3L96 192c0-70.7 57.3-128 128-128zM156.1 464c9.9 28 36.6 48 67.9 48s58-20 67.9-48L256 464c-7.3 9.7-18.9 16-32 16s-24.7-6.3-32-16l-35.9 0z"/>
                                </svg>
                            </MenuButton>

                            <MenuItems
                                transition
                                anchor="bottom start"
                                className="w-80 rounded-xl border border-gray-50 bg-white z-9999 p-1 text-sm text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                            >
                                {/*<MenuHeading>*/}
                                {/*    <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-white">*/}
                                {/*        پیام ها*/}
                                {/*    </h3>*/}
                                {/*</MenuHeading>*/}

                                {/*{[1, 2, 3].map((item) => (*/}
                                {/*    <div key={item}>*/}
                                <MenuItem>
                                    {/*<Image*/}
                                    {/*    src="/images/user/user-02.jpg"*/}
                                    {/*    alt="User"*/}
                                    {/*    width={40}*/}
                                    {/*    height={40}*/}
                                    {/*    className="rounded-full"*/}
                                    {/*/>*/}

                                    <div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            New notification message
                                        </p>

                                        <span className="text-xs text-gray-500">5 min ago</span>
                                    </div>
                                </MenuItem>
                                {/*</div>*/}
                                {/*))}*/}
                            </MenuItems>
                        </Menu>


                        {notificationDropdown && (
                            <div
                                className="absolute left-0 top-16 max-h-60 w-84 overflow-y-auto rounded-xl border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-800 dark:bg-gray-900">
                                <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-white">
                                    پیام ها
                                </h3>

                                <div className="space-y-3">
                                    {[1, 2, 3].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 dark:border-gray-800"
                                        >
                                            <Image
                                                src="/images/user/user-02.jpg"
                                                alt="User"
                                                width={40}
                                                height={40}
                                                className="rounded-full"
                                            />

                                            <div>
                                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                                    New notification message
                                                </p>

                                                <span className="text-xs text-gray-500">5 min ago</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Dropdown */}
                    <div className="relative">
                        <Link href="/dashboard/me" className="flex items-center gap-3">
                            {user?.avatar === null ? (
                                <span className="font-semibold text-xl text-blue-500">
                                        {String(user?.name).slice(0, 2)}
                                </span>
                            ) : (
                                <Image
                                    width={44}
                                    height={44}
                                    src={`/${user?.avatar}`}
                                    alt={`${user?.name}`}
                                    className="rounded-full ring ring-blue-400"
                                />
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}