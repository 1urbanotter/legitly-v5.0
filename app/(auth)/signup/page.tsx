'use client'

import 'react-toastify/dist/ReactToastify.css'

import { zodResolver } from '@hookform/resolvers/zod'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast, ToastOptions } from 'react-toastify'
import * as z from 'zod'

const signUpSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type SignUpSchemaType = z.infer<typeof signUpSchema>

const SignUpPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (data: SignUpSchemaType) => {
    setLoading(true)
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (res.status === 201) {
        const { token } = await res.json()
        setCookie('token', token, { maxAge: 60 * 60 * 24 })
        const toastOptions: ToastOptions = {
          position: 'top-center',
          autoClose: 1500,
        }
        toast.success(
          'You have successfully signed up. Redirecting...',
          toastOptions
        )

        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      } else {
        const toastOptions: ToastOptions = {
          position: 'top-center',
        }
        const { message } = await res.json()
        toast.error(message || 'An error occurred during signup.', toastOptions)
      }
    } catch (err) {
      console.error(err)
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
          Sign Up for Legitly
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* First Name Input */}
          <div className='mb-6'>
            <label
              className='mb-2 block text-lg font-bold text-white_supreme'
              htmlFor='firstName'
            >
              FIRST NAME:
            </label>
            <input
              className={`w-full rounded-lg border-4 border-white_supreme px-3 py-4 text-lg font-bold leading-tight text-navy_blue shadow-md hover:ring hover:ring-neon_blue focus:outline-none focus:ring focus:ring-neon_blue ${
                errors.firstName
                  ? 'border-almost_red bg-almost_red-900 ring-almost_red'
                  : ''
              }`}
              id='firstName'
              type='text'
              placeholder='Enter First Name'
              {...register('firstName')}
            />
            {errors.firstName && (
              <p className='text-md pt-2 text-almost_red'>
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name Input */}
          <div className='mb-6'>
            <label
              className='mb-2 block text-lg font-bold text-white_supreme'
              htmlFor='lastName'
            >
              LAST NAME:
            </label>
            <input
              className={`w-full rounded-lg border-4 border-white_supreme px-3 py-4 text-lg font-bold leading-tight text-navy_blue shadow-md hover:ring hover:ring-neon_blue focus:outline-none focus:ring focus:ring-neon_blue ${
                errors.lastName
                  ? 'border-almost_red bg-almost_red-900 ring-almost_red'
                  : ''
              }`}
              id='lastName'
              type='text'
              placeholder='Enter Last Name'
              {...register('lastName')}
            />
            {errors.lastName && (
              <p className='text-md pt-2 text-almost_red'>
                {errors.lastName.message}
              </p>
            )}
          </div>

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
              placeholder='Your Password'
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
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage
