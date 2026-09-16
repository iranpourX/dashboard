import {NextResponse} from "next/server"

export function proxy() {
    return NextResponse.next()
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/login",
        "/register"
    ]
}

const methods = [
    "POST",
    "PUT",
    "PATCH",
    "DELETE"
]