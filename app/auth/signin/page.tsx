// app/login/page.tsx
'use client'
import { useSearchParams } from 'next/navigation'
import { useLogin } from '@/lib/hook/useLogin'
import { Field, Input } from '@/ui/components/InputField'

export default function LoginPage() {
  const { form, handleSubmit, error, loading } = useLogin()
  const searchParams = useSearchParams()
  const urlError = searchParams.get('error')
  const {
    register,
    formState: { errors },
  } = form
  return (
    <section className='grid place-items-center h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-6 w-full max-w-sm mx-auto p-8 bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 transition-colors duration-300'
      >
        <h1 className='text-2xl font-bold text-center text-gray-800 dark:text-gray-100'>
          Welcome Back 👋
        </h1>

        {/* Email Field with Error */}
        <Field label='Email' error={errors?.email?.message}>
          <Input error={errors.email?.message} register={register('email')} />
        </Field>

        {/* Password Field with Error */}

        <Field label='Password' error={errors?.password?.message}>
          <Input
            error={errors.password?.message}
            register={register('password')}
          />
        </Field>
        {/* Button with loading state */}
        <button
          type='submit'
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors duration-200 
            ${
              loading
                ? 'opacity-70 cursor-not-allowed'
                : 'hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600'
            }`}
        >
          {loading ? (
            <>
              <svg
                className='animate-spin h-5 w-5 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
                ></path>
              </svg>
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </button>

        {/* Error messages */}
        {error && (
          <div className='text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 p-2 rounded-md text-center animate-pulse'>
            {error}
          </div>
        )}
        {urlError === 'Configuration' && (
          <div className='text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 p-2 rounded-md text-center animate-pulse'>
            Authentication configuration error
          </div>
        )}
      </form>
    </section>
  )
}
