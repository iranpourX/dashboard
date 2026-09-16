import {NextRequest} from "next/server"

export function verifyOrigin(req: NextRequest) {
    const origin = req.headers.get("origin")
    const host = process.env.URL

    return origin === host
}