"use client"

import {OTPInput} from "input-otp";
import {Slot} from '@/components/ui/otp-slot'


type Props = {
    value: string
    onChangeAction: (value: string) => void
}

export function OtpInput({value, onChangeAction}: Props) {

    return (
        <div dir="ltr" className="flex justify-center gap-2">
            <OTPInput
                maxLength={6}
                containerClassName="group text-black flex items-center has-[:disabled]:opacity-40"
                className="text-black"
                onChange={onChangeAction}
                render={({slots}) => (
                    <div className="flex">
                        {slots.map((slot, idx) => (
                            <Slot key={idx} {...slot} />
                        ))}
                    </div>
                )}
            />
        </div>
    )
}
