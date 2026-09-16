import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import {UAParser} from "ua-parser-js"
import {formatDistance} from 'date-fns'
import {faIR} from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function response(message: string, status: number) {
    return {
        data: {
            message: message,
            status: status,
        }
    }
}

export function isOnline(date: Date) {
    const diff = Math.abs(Date.now() - Number(date))
    if (diff < 60_000) {
        return "آنلاین"
    }
    return `${formatDistance(date, new Date(), {addSuffix: true, locale: faIR})}`
}

export function getBrowserModel(ua?: string | null) {
    const result = UAParser(ua as string);
    return result.browser.name
}

export function getUserOS(ua?: string | null) {
    const result = UAParser(ua as string);
    return result.os.name
}