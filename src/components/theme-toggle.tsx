"use client"

import {useTheme} from "next-themes"
import {useEffect, useState} from "react"

export function ThemeToggle() {
    const {theme, setTheme} = useTheme()

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <button
            onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
            }
            className="flex p-2 items-center justify-center dark:border-gray-800 dark:bg-gray-900"
        >
            {theme === "dark" ? (
                <svg className="text-gray-600 size-6" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 576 512">
                    <path fill="currentColor"
                          d="M288 432c8.8 0 16 7.2 16 16l0 80c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-80c0-8.8 7.2-16 16-16zM140.9 380.4c6.2-6.2 16.4-6.2 22.7 0s6.2 16.4 0 22.7L107 459.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l56.6-56.6zm271.5 0c6.2-6.2 16.4-6.2 22.7 0L491.7 437c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0l-56.6-56.6c-6.2-6.2-6.2-16.4 0-22.7zM288 384a128 128 0 1 1 0-256 128 128 0 1 1 0 256zm0-224a96 96 0 1 0 0 192 96 96 0 1 0 0-192zM96 240c8.8 0 16 7.2 16 16s-7.2 16-16 16l-80 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l80 0zm464 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-80 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l80 0zM84.3 52.3c6.2-6.2 16.4-6.2 22.6 0l56.6 56.6c6.2 6.2 6.2 16.4 0 22.7s-16.4 6.2-22.7 0L84.3 75c-6.2-6.2-6.2-16.4 0-22.6zm384.7 0c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6l-56.6 56.6c-6.2 6.2-16.4 6.2-22.7 0s-6.2-16.4 0-22.7L469 52.3zM288-32c8.8 0 16 7.2 16 16l0 80c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-80c0-8.8 7.2-16 16-16z"/>
                </svg>
            ) : (
                <svg className="text-gray-600 size-6" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 512 512">
                    <path fill="currentColor"
                          d="M256 32c9.5 0 18.9 .6 28 1.7-60.1 38.3-100 105.6-100 182.3 0 117.2 96.4 212.8 210.7 215.9-38.2 30.1-86.3 48.1-138.7 48.1-123.7 0-224-100.3-224-224S132.3 32 256 32zm0-32C114.6 0 0 114.6 0 256S114.6 512 256 512c68.8 0 131.3-27.2 177.3-71.4 7.3-7 9.4-17.9 5.3-27.1s-13.7-14.9-23.8-14.1c-105.4 8.4-198.8-77.3-198.8-183.4 0-72.1 41.5-134.6 102.1-164.8 9.1-4.5 14.3-14.3 13.1-24.4S322.6 8.5 312.7 6.3C294.4 2.2 275.4 0 256 0z"/>
                </svg>
            )}
        </button>
    )
}