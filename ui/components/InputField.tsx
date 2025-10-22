import { LabelHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
interface FieldProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  label: string
  error: string | undefined
  props?: React.ReactElement
}
export function Field({ children, label, error, ...props }: FieldProps) {
  return (
    <div className='space-y-2'>
      <label className='relative block' {...props}>
        {children}
        <span
          className='absolute left-3 top-3 text-sm transition-all 
              peer-placeholder-shown:top-4 
              peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-gray-400 
              peer-focus:top-1 
              peer-focus:text-xs 
              peer-focus:text-blue-600 
              dark:peer-focus:text-blue-400'
        >
          {label}
        </span>
      </label>
      {error && <p className='text-red-500 text-sm animate-pulse'>{error}</p>}
    </div>
  )
}

interface InputProps extends Record<string, any> {
  register: UseFormRegisterReturn
  error: string | undefined
}

export function Input({ register, error, ...props }: InputProps) {
  return (
    <input
      {...props}
      {...register}
      placeholder=' '
      className={`peer w-full p-3 pt-5 border bg-transparent rounded-lg focus:outline-none focus:ring-2 transition text-gray-900 dark:text-gray-100
                ${
                  error
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                }`}
    />
  )
}
