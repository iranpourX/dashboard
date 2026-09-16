import crypto from "crypto"

export function generateCsrfToken() {
    return  crypto.randomBytes(32).toString("hex")
}

export function getCsrfToken() {
    return document.cookie
        .split("; ")
        .find(row => row.startsWith("csrf_token="))
        ?.split("=")[1]
}