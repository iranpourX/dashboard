import {generateOtp} from "./generate-otp"
import {sha256} from "../hash"

export function createOtp() {
    const code = generateOtp()

    return {
        code,
        hash: sha256(code)
    }
}