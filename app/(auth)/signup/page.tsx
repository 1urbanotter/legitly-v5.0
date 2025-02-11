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
    <div className='flex min-h-screen items-center justify-center bg-sky-800'>
      <div className='bg-space w-full max-w-md rounded-2xl p-8 shadow-xl'>
        <h1 className='mb-6 text-center font-dm-serif text-4xl font-bold text-white'>
          Sign Up for Legitly
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* First Name Input */}
          <div className='mb-6'>
            <label
              className='mb-2 block text-lg font-bold text-sky-600'
              htmlFor='firstName'
            >
              First Name
            </label>
            <input
              className={`text-space-600 w-full rounded-lg border-4 border-white px-3 py-4 text-lg leading-tight shadow-lg hover:ring-4 hover:ring-sky-800 focus:outline-none focus:ring-4 focus:ring-sky-500 ${
                errors.email ? 'ring-red border-red-400 bg-red-200' : ''
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
              className='mb-2 block text-lg font-bold text-sky-600'
              htmlFor='lastName'
            >
              Last Name
            </label>
            <input
              className={`text-space-600 w-full rounded-lg border-4 border-white px-3 py-4 text-lg leading-tight shadow-lg hover:ring-4 hover:ring-sky-800 focus:outline-none focus:ring-4 focus:ring-sky-500 ${
                errors.email ? 'ring-red border-red-400 bg-red-200' : ''
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
              className='mb-2 block text-lg font-bold text-sky-600'
              htmlFor='email'
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
              <p className='text-md pt-2 text-almost_red'>
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
              className={`text-space-600 w-full rounded-lg border-4 border-white px-3 py-4 text-lg leading-tight shadow-lg hover:ring-4 hover:ring-sky-800 focus:outline-none focus:ring-4 focus:ring-sky-500 ${
                errors.email ? 'ring-red border-red-400 bg-red-200' : ''
              }`}
              id='password'
              type='password'
              placeholder='Create a Password'
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
              className={`bg-sky text-raisin focus:ring-silver mt-6 w-full rounded-lg px-4 py-4 text-xl font-bold transition-all duration-200 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
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
