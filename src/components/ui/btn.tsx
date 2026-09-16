import {ReactNode} from 'react'
import {cn} from '@/utils/utils'
import {LineSpinner} from "ldrs/react"
import 'ldrs/react/LineSpinner.css'

type ButtonProps = {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  onClick?: () => void
  loading?: boolean
  className?: string
  inType?: "button" | "submit"
  form?: string
}

export default function Btn(
    {
      children,
      size = 'md',
      onClick,
      className,
      loading = false,
      inType = "button",
      form
    }: ButtonProps) {
  const sizeClasses = {
    sm: "px-3.5 py-2 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-4 py-3.5 text-base",
    xl: "px-5 py-4 text-lg"
  }

  return (
      <button
          type={inType}
          form={form}
          onClick={onClick}
          disabled={loading}
          className={cn(
              'relative flex items-center justify-center font-semibold gap-2 cursor-pointer',
              'rounded-lg disabled:cursor-not-allowed bg-blue-600 border border-blue-600 text-white',
              'focus:outline-none active:outline-none',
              sizeClasses[size], className
          )}
      >
        {
            loading && (<span className={`inline-flex items-center transition-opacity absolute ${
                loading ? 'opacity-100' : 'opacity-0'}`}>
                    <LineSpinner
                        color={'white'}
                        stroke={1.5}
                        size={20}
                        speed={1}
                    />
                </span>)
        }

        <span
            className={`transition-opacity flex items-center gap-1 ${
                loading ? 'opacity-0' : 'opacity-100'}`}>
                {children}</span>
      </button>
  )
}
