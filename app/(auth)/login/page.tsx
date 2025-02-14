// app/(auth)/login/page.tsx

'use client'

import 'react-toastify/dist/ReactToastify.css'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast, ToastOptions } from 'react-toastify'
import * as z from 'zod'
import { signInUser } from '@/lib/auth' // Import signInUser function
import { useCookies } from 'react-cookie'

const loginSchema = z.object({
  email: z.string().email('❌ Invalid email address'),
  password: z.string().min(6, '❌ Pleasae enter your password'),
})

type LoginSchemaType = z.infer<typeof loginSchema>

const LoginPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  })
  const [, setCookie] = useCookies(['token'])

  const onSubmit = async (data: LoginSchemaType) => {
    setLoading(true)
    try {
      // Use the signInUser function from lib/auth.ts
      const { userId } = await signInUser(data.email, data.password)

      setCookie('token', userId, { maxAge: 60 * 60 * 24 })

      const toastOptions: ToastOptions = {
        position: 'top-center',
        autoClose: 1500,
      }
      toast.success(
        'You have successfully logged in. Redirecting...',
        toastOptions
      )
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } catch (err: any) {
      console.error('Login error:', err)
      const toastOptions: ToastOptions = {
        position: 'top-center',
      }
      toast.error(
        err.message || 'An error occurred during login.',
        toastOptions
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-sky-800'>
      <div className='bg-space w-full max-w-md rounded-2xl p-8 shadow-xl'>
        <h1 className='mb-6 text-center font-dm-serif text-4xl font-bold text-white'>
          Login to Legitly
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div className='mb-6'>
            <label
              className='mb-2 block text-lg font-bold text-sky-600'
              htmlFor='password'
            >
              Email
            </label>
            <input
              className={`text-space-600 w-full rounded-lg border-4 border-white px-3 py-4 text-lg leading-tight shadow-lg hover:ring-4 hover:ring-sky-800 focus:outline-none focus:ring-4 focus:ring-sky-500 ${
                errors.email ? 'ring-red border-red-400 bg-red-200' : ''
              }`}
              id='email'
              type='email'
              placeholder='john_doe@email.com'
              {...register('email')}
            />
            {errors.email && (
              <p className='pt-2 text-lg text-red-500'>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className='mb-6'>
            <label
              className='mb-2 block text-lg font-bold text-sky-600'
              htmlFor='password'
            >
              Password
            </label>
            <input
              className={`text-space-600 w-full rounded-lg border-4 border-white px-3 py-4 text-lg leading-tight shadow-lg hover:ring hover:ring-sky-800 focus:outline-none focus:ring focus:ring-sky-900 ${
                errors.password ? 'ring-red border-red-400 bg-red-200' : ''
              }`}
              id='password'
              type='password'
              placeholder='Password'
              {...register('password')}
            />
            {errors.password && (
              <p className='pt-2 text-lg text-red-500'>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className='flex items-center justify-between'>
            <button
              className={`bg-sky text-raisin focus:ring-silver mt-6 w-full rounded-lg px-4 py-4 text-xl font-bold transition-all duration-200 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                loading ? 'cursor-not-allowed opacity-50' : ''
              }`}
              type='submit'
              disabled={loading}
            >
              {loading ? 'Logging In...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
