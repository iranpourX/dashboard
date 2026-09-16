import {NextResponse} from "next/server"
import {clearAuthCookies} from "@/lib/cookie"
import {response} from "@/utils/utils";

export async function POST() {
    await clearAuthCookies()

    return NextResponse.json(response('Logout successfully', 200), {status: 200})
}