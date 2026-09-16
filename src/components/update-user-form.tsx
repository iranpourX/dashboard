"use client"

import {toast} from "sonner";
import {useRouter} from "next/navigation"
import {useForm, SubmitHandler} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {useUpdateProfile} from "@/hooks/use-update-profile"
import Btn from '@/components/ui/btn'

import {UpdateProfileInput, UpdateProfileSchema} from "@/lib/validation/profile"

type User = {
    name: string
    phone: string
    email: string
} | undefined

interface UpdateUserFormProps {
    user: User
}

export const UpdateUserForm = (props: UpdateUserFormProps) => {
        const router = useRouter()
        const {mutateAsync, isPending} = useUpdateProfile()
        const {
            register,
            handleSubmit,
            formState: {errors}
        } = useForm<UpdateProfileSchema>({
            resolver: zodResolver(UpdateProfileInput)
        })

        const onSubmit: SubmitHandler<UpdateProfileSchema> = async (value) => {
            try {
                await mutateAsync(value)
                router.refresh()

            } catch {
                alert(
                    "Update failed",
                );
            }
            // const log = await db.update(users)
            // .set({
            //     name: value.name,
            //     phone: value.phone,
            // })
            // .where(eq(users.id, user.id))

            // console.log(log)
        }

        return (
            <form className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between"
                  onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                        ویرایش اطلاعات
                    </h4>

                    <div className="grid grid-cols-12 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                        <div className="mb-6">
                            <label htmlFor="name" className="mylabel">نام </label>
                            <input
                                id="name"
                                type="text"
                                {...register('name')}
                                defaultValue={props.user?.name}
                                className="myinput"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="email" className="mylabel">ایمیل </label>
                            <input
                                id="email"
                                type="email"
                                defaultValue={props.user?.email}
                                className="myinput disabled:bg-gray-100! disabled:text-gray-500!"
                                {...register('email')}
                            />
                        </div>

                    </div>
                </div>

                <Btn inType="submit" loading={isPending}>
                    ذخیره
                </Btn>
            </form>
        );
    }
;
