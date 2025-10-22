import { useState } from 'react'
import { useForm as useHookForm } from 'react-hook-form'
import { userLoginSchema } from '../schemas/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
export function useLogin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { replace } = useRouter()

  const form = useHookForm({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const handleSubmit = form.handleSubmit(async (data) => {
    setLoading(true)
    setError('')
    try {
      // Simulate form submission
      console.log('Form submitted:', data)
      const result = await signIn('credentials', { ...data, redirect: false })
      if (result?.code === 'USER_NOT_FOUND') {
        setError('User not found')
        return
      } else if (result?.code === 'INVALID_CREDENTIALS') {
        setError('Wrong password, please try again')
        return
      }

      replace('/')
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  })
  return { form, error, loading, handleSubmit }
}
