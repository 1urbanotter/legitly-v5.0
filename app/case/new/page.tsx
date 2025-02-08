// app/case/new/page.tsx

'use client'

import 'react-toastify/dist/ReactToastify.css'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useForm } from 'react-hook-form'
import { toast, ToastOptions } from 'react-toastify'
import * as z from 'zod'

import DashboardHeader from '@/components/dashboard/Header'

const newCaseSchema = z.object({
  issueDescription: z
    .string()
    .min(10, 'Issue description must be at least 10 characters'),
  partiesInvolved: z
    .string()
    .min(5, 'Parties involved must be at least 5 characters'),
  incidentDate: z.string().refine((val) => {
    try {
      new Date(val)
      return true
    } catch (e) {
      return false
    }
  }, 'Invalid date'),
  zipCode: z.string().regex(/^\d{5}$/, 'Invalid zip code'),
  issueImpact: z.array(z.string()).optional(),
  otherImpact: z.string().optional(),
  desiredResolution: z
    .string()
    .min(10, 'Desired resolution must be at least 10 characters'),
})

type NewCaseSchemaType = z.infer<typeof newCaseSchema>

const NewCasePage = () => {
  const [cookies] = useCookies(['token'])
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<NewCaseSchemaType>({
    resolver: zodResolver(newCaseSchema),
  })

  const otherImpactValue = watch('otherImpact')

  const impactOptions = [
    'Financial loss',
    'Emotional distress',
    'Property damage',
    'Reputational harm',
    'Time loss',
  ]

  const handleImpactChange = (impact: string) => {
    const currentImpacts = watch('issueImpact') || []
    if (currentImpacts.includes(impact)) {
      setValue(
        'issueImpact',
        currentImpacts.filter((item) => item !== impact)
      )
    } else {
      setValue('issueImpact', [...currentImpacts, impact])
    }
  }

  const onSubmit = async (data: NewCaseSchemaType) => {
    setLoading(true)
    const token = cookies.token
    if (!token) {
      toast.error('Authentication token not found. Please log in again.', {
        position: 'top-center',
      })
      setLoading(false)
      return
    }

    const formData = new FormData()
    formData.append('issueDescription', data.issueDescription)
    formData.append('partiesInvolved', data.partiesInvolved)
    formData.append('incidentDate', data.incidentDate)
    formData.append('zipCode', data.zipCode)
    formData.append('desiredResolution', data.desiredResolution)
    if (data.otherImpact) {
      formData.append('otherImpact', data.otherImpact)
    }

    data.issueImpact?.forEach((impact) => {
      formData.append('issueImpact', impact)
    })

    try {
      const response = await fetch('/api/cases', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (response.ok) {
        const toastOptions: ToastOptions = {
          position: 'top-center',
          autoClose: 1500,
        }
        toast.success(
          'Your case has been submitted successfully.',
          toastOptions
        )
        const data = await response.json()
        setTimeout(() => {
          router.push(`/case/${data.case._id}`)
        }, 1500)
      } else {
        const errorData = await response.json()
        toast.error(
          errorData.message || 'An error occurred while submitting the case.',
          {
            position: 'top-center',
          }
        )
      }
    } catch (error: any) {
      console.error('Submission error:', error)
      toast.error('Network error or server is down.', {
        position: 'top-center',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='mt-20 min-h-screen bg-white_supreme p-4 sm:p-8'>
      <div className='mx-auto max-w-3xl rounded-2xl bg-navy_blue p-6 shadow-md'>
        <DashboardHeader
          user={{
            _id: '0',
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
          }}
        />
        <h1 className='mb-6 text-3xl font-bold text-white_supreme'>
          New Case Intake
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label
              className='mb-2 block text-xl font-bold text-white_supreme'
              htmlFor='issueDescription'
            >
              What&apos;s going on?
            </label>
            <textarea
              className={`focus:shadow-outline w-full appearance-none rounded-xl border px-3 py-2 text-lg leading-tight text-navy_blue shadow focus:outline-none ${
                errors.issueDescription ? 'border-almost_red' : ''
              }`}
              id='issueDescription'
              placeholder='Describe your situation here.'
              rows={5}
              {...register('issueDescription')}
            />
            {errors.issueDescription && (
              <p className='text-xs italic text-red-500'>
                {errors.issueDescription.message}
              </p>
            )}
          </div>

          <div className='mb-4'>
            <label
              className='mb-2 block text-xl font-bold text-white_supreme'
              htmlFor='partiesInvolved'
            >
              Who is involved?
            </label>
            <textarea
              className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
                errors.partiesInvolved ? 'border-red-500' : ''
              }`}
              id='partiesInvolved'
              placeholder='List the parties involved'
              rows={4}
              {...register('partiesInvolved')}
            />
            {errors.partiesInvolved && (
              <p className='text-xs italic text-red-500'>
                {errors.partiesInvolved.message}
              </p>
            )}
          </div>

          <div className='mb-4'>
            <label
              className='mb-2 block text-xl font-bold text-white_supreme'
              htmlFor='incidentDate'
            >
              When did this happen?
            </label>
            <input
              className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
                errors.incidentDate ? 'border-red-500' : ''
              }`}
              id='incidentDate'
              type='date'
              {...register('incidentDate')}
            />
            {errors.incidentDate && (
              <p className='text-xs italic text-red-500'>
                {errors.incidentDate.message}
              </p>
            )}
          </div>

          <div className='mb-4'>
            <label
              className='mb-2 block text-xl font-bold text-white_supreme'
              htmlFor='zipCode'
            >
              Where did this happen? (ZIP Code)
            </label>
            <input
              className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
                errors.zipCode ? 'border-red-500' : ''
              }`}
              id='zipCode'
              type='text'
              placeholder='Enter ZIP Code'
              {...register('zipCode')}
            />
            {errors.zipCode && (
              <p className='text-xs italic text-red-500'>
                {errors.zipCode.message}
              </p>
            )}
          </div>

          <div className='mb-4'>
            <label className='mb-2 block text-xl font-bold text-white_supreme'>
              How has this impacted you?
            </label>
            {impactOptions.map((impact) => (
              <div key={impact} className='mb-2'>
                <label className='inline-flex items-center'>
                  <input
                    type='checkbox'
                    className='form-checkbox h-5 w-5 text-white_supreme'
                    value={impact}
                    checked={(watch('issueImpact') || []).includes(impact)}
                    {...register('issueImpact')}
                  />
                  <span className='ml-2 text-lg font-medium text-white_supreme'>
                    {impact}
                  </span>
                </label>
              </div>
            ))}
            <div className='mb-2'>
              <label className='inline-flex items-center'>
                <input
                  type='checkbox'
                  className='form-checkbox h-5 w-5 text-white_supreme'
                  checked={!!otherImpactValue}
                  onChange={() =>
                    setValue('otherImpact', otherImpactValue ? '' : 'Other')
                  }
                />
                <span className='ml-2 text-white_supreme'>Other</span>
              </label>
              {otherImpactValue && (
                <input
                  type='text'
                  className='focus:shadow-outline mt-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-white_supreme shadow focus:outline-none'
                  placeholder='Please specify'
                  {...register('otherImpact')}
                />
              )}
            </div>
          </div>

          <div className='mb-4'>
            <label
              className='mb-2 block text-xl font-bold text-white_supreme'
              htmlFor='desiredResolution'
            >
              What is your desired resolution?
            </label>
            <textarea
              className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
                errors.desiredResolution ? 'border-red-500' : ''
              }`}
              id='desiredResolution'
              placeholder='Describe how you would like this issue to be resolved'
              rows={4}
              {...register('desiredResolution')}
            />
            {errors.desiredResolution && (
              <p className='text-xs italic text-red-500'>
                {errors.desiredResolution.message}
              </p>
            )}
          </div>

          <button
            className='focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
            type='submit'
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Case'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewCasePage
