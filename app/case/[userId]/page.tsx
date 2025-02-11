// app/case/[userId]/page.tsx
'use client'

import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import CaseItem from '@/components/CaseItem'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import Loading from '@/components/common/Loading'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { Case } from '@/types/case'

interface CaseDetailPageProps {
  params: { id: string }
}

const CaseDetailPage: React.FC<CaseDetailPageProps> = ({ params }) => {
  const { id } = useParams()
  const router = useRouter()
  const [caseData, setCaseData] = useState<Case | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCaseData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/cases/${id}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch case: ${response.status}`)
        }
        const data: Case = await response.json()
        setCaseData(data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch case')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchCaseData()
    }
  }, [id])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <div className='text-red-500'>Error: {error}</div>
  }

  if (!caseData) {
    return <div>Case not found.</div>
  }

  return (
    <ErrorBoundary>
      <div className='min-h-screen bg-gray-100 py-6'>
        <div className='container mx-auto px-4'>
          <DashboardHeader
            user={{
              _id: '1',
              firstName: 'John',
              lastName: 'Doe',
              email: 'john@example.com',
            }}
          />{' '}
          {/* Replace with actual user data */}
          <div className='rounded-lg bg-white p-6 shadow-md'>
            <h1 className='mb-4 text-2xl font-bold text-gray-800'>
              Case Detail
            </h1>
            <CaseItem caseItem={caseData} />
            <button
              onClick={() => router.back()}
              className='mt-4 rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400'
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default CaseDetailPage
