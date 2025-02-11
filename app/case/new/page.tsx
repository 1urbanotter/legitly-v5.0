// app/case/new/page.tsx

'use client'

import 'react-toastify/dist/ReactToastify.css'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useForm } from 'react-hook-form'
import { toast, ToastOptions } from 'react-toastify'
import { redirect } from 'next/navigation'
import * as z from 'zod'

import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { CaseButton } from '@/components/ui/CaseButton'

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
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
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
    const token = cookies['token']
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
        const { case: newCase } = await response.json()
        setTimeout(() => {
          router.push(`/case/${newCase._id}`)
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
    <div className='bg-raisin min-h-screen p-4 pt-20 sm:p-8'>
      <div className='shadow-silver-300 mx-auto max-w-3xl rounded-2xl bg-sky-700 p-6 shadow-lg'>
        <DashboardHeader
          user={{
            _id: '',
            firstName: 'Friend!',
            lastName: 'User',
            email: 'test@example.com',
          }}
        />
        <h1 className='border-space mb-6 border-t-4 pt-4 font-dm-serif text-3xl font-bold text-white_supreme'>
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
              className={`focus:shadow-outline text-space focus:ring-space w-full appearance-none rounded-xl border px-3 py-2 text-lg leading-tight shadow focus:outline-none focus:ring ${
                errors.issueDescription ? 'border-red-700' : ''
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
              className='text-raisin mb-2 block text-xl font-bold'
              htmlFor='partiesInvolved'
            >
              Who is involved?
            </label>
            <textarea
              className={`focus:shadow-outline text-space focus:ring-space w-full appearance-none rounded-xl border px-3 py-2 text-lg leading-tight shadow focus:outline-none focus:ring ${
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
              className='text-raisin mb-2 block text-xl font-bold'
              htmlFor='incidentDate'
            >
              When did this happen?
            </label>
            <input
              className={`focus:shadow-outline text-space focus:ring-space w-full appearance-none rounded-xl border px-3 py-2 text-lg leading-tight shadow focus:outline-none focus:ring ${
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
              className='text-raisin mb-2 block pt-4 text-xl font-bold'
              htmlFor='zipCode'
            >
              Where did this happen? (ZIP Code)
            </label>
            <input
              className={`focus:shadow-outline text-space focus:ring-space w-full appearance-none rounded-xl border px-3 py-2 text-lg leading-tight shadow focus:outline-none focus:ring ${
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
            <label className='text-raisin mb-2 block pt-4 text-xl font-bold'>
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
              className='text-raisin mb-2 block pt-4 text-xl font-bold'
              htmlFor='desiredResolution'
            >
              What is your desired resolution?
            </label>
            <textarea
              className={`focus:shadow-outline text-space focus:ring-space w-full appearance-none rounded-xl border px-3 py-2 text-lg leading-tight shadow focus:outline-none focus:ring ${
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

          <CaseButton variant='destructive' type='submit' disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Case'}
          </CaseButton>
        </form>
      </div>
    </div>
  )
}

export default NewCasePage
