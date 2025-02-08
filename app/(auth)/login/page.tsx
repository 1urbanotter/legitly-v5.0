'use client'

import 'react-toastify/dist/ReactToastify.css'

import { zodResolver } from '@hookform/resolvers/zod'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast, ToastOptions } from 'react-toastify'
import * as z from 'zod'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
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

  const onSubmit = async (data: LoginSchemaType) => {
    setLoading(true)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        const { token } = await res.json()
        setCookie('token', token, { maxAge: 60 * 60 * 24 })
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
      } else {
        const errorData = await res.json()
        const toastOptions: ToastOptions = {
          position: 'top-center',
        }
        toast.error(
          errorData.message || 'An error occurred during login.',
          toastOptions
        )
      }
    } catch (err) {
      console.error('Login error:', err)
      const toastOptions: ToastOptions = {
        position: 'top-center',
      }
      toast.error('Network error or server is down.', toastOptions)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-white_supreme'>
      <div className='w-full max-w-md rounded-2xl bg-navy_blue p-8 shadow-lg'>
        <h1 className='mb-6 text-center text-4xl font-bold text-white_supreme'>
          Login to Legitly
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div className='mb-6'>
            <label
              className='mb-2 block text-lg font-bold text-white_supreme'
              htmlFor='email'
            >
              EMAIL:
            </label>
            <input
              className={`w-full rounded-lg border-4 border-white_supreme px-3 py-4 text-lg font-bold leading-tight text-navy_blue shadow-md hover:ring hover:ring-neon_blue focus:outline-none focus:ring focus:ring-neon_blue ${
                errors.email
                  ? 'border-almost_red bg-almost_red-900 ring-almost_red'
                  : ''
              }`}
              id='email'
              type='email'
              placeholder='john_doe@email.com'
              {...register('email')}
            />
            {errors.email && (
              <p className='text-md pt-2 text-almost_red'>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className='mb-6'>
            <label
              className='mb-2 block text-lg font-bold text-white_supreme'
              htmlFor='password'
            >
              PASSWORD:
            </label>
            <input
              className={`w-full rounded-lg border-4 border-white_supreme px-3 py-4 text-lg font-bold leading-tight text-navy_blue shadow-md hover:ring hover:ring-neon_blue focus:outline-none focus:ring focus:ring-neon_blue ${
                errors.password
                  ? 'border-almost_red bg-almost_red-900 ring-almost_red'
                  : ''
              }`}
              id='password'
              type='password'
              placeholder='Password'
              {...register('password')}
            />
            {errors.password && (
              <p className='text-md pt-2 text-almost_red'>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className='flex items-center justify-between'>
            <button
              className={`mt-6 w-full rounded-lg bg-neon_blue px-4 py-4 text-xl font-bold text-navy_blue transition-all duration-200 hover:bg-neon_blue-700 focus:outline-none focus:ring-2 focus:ring-neon_blue focus:ring-offset-2 ${
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
