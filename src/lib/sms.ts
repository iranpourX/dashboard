import axios from "axios"

export async function sendSMS(number: string, message: string) {
    return await axios({
        method: 'post',
        url: `https://api.kavenegar.com/v1/6D4C594C72595766386C4C62786B67383869622F466D714B5A452F57516C7366/sms/send.json`,
        headers: {'Content-Type': 'application/json'},
        params: {
            receptor: number,
            message: message
        },
    })
}