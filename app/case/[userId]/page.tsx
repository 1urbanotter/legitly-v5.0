// app/case/[userId]/page.tsx
'use client'

import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import CaseItem from '@/components/CaseItem'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import Loading from '@/components/common/Loading'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { Case } from '@/types/case'
import { AnalysisResult } from '@/types/analysisResult'

interface CaseDetailPageProps {
  params: { id: string }
}

const CaseDetailPage: React.FC<CaseDetailPageProps> = ({ params }) => {
  const { id } = useParams()
  const router = useRouter()
  const [caseData, setCaseData] = useState<Case | null>(null)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
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
      }
    }

    const fetchAnalysis = async () => {
      try {
        const response = await fetch(`/api/case/analyze/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(
            errorData.message || 'Failed to fetch legal analysis.'
          )
        }

        const { analysis }: { analysis: AnalysisResult } = await response.json()
        setAnalysis(analysis)
      } catch (err: any) {
        console.error('Error fetching analysis:', err)
        toast.error(err.message || 'Failed to fetch legal analysis.')
      }
    }

    Promise.all([fetchCaseData(), fetchAnalysis()])
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
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

            {analysis && (
              <div className='mt-6 border-t pt-4'>
                <h2 className='text-xl font-semibold text-gray-700'>
                  Legal Analysis
                </h2>
                <div className='mt-2'>
                  <p>
                    <strong>Case Classification:</strong>{' '}
                    {analysis.caseClassification || 'Not available'}
                  </p>
                  <p>
                    <strong>Relevant Laws:</strong>{' '}
                    {analysis.relevantLaws
                      ? analysis.relevantLaws.join(', ')
                      : 'Not available'}
                  </p>
                  <p>
                    <strong>Jurisdiction:</strong>{' '}
                    {analysis.jurisdiction || 'Not available'}
                  </p>
                  <p>
                    <strong>Recommendations:</strong>{' '}
                    {analysis.recommendations
                      ? analysis.recommendations.join(', ')
                      : 'Not available'}
                  </p>
                  <p>
                    <strong>Deadlines:</strong>{' '}
                    {analysis.deadlines
                      ? analysis.deadlines.join(', ')
                      : 'Not available'}
                  </p>
                  <p>
                    <strong>Strength Indicators:</strong>{' '}
                    {analysis.strengthIndicators || 'Not available'}
                  </p>
                  <p>
                    <strong>Supporting Documentation:</strong>{' '}
                    {analysis.supportingDocumentation
                      ? analysis.supportingDocumentation.join(', ')
                      : 'Not available'}
                  </p>
                  <p>
                    <strong>Drafted Communication:</strong>{' '}
                    {analysis.draftedCommunication || 'Not available'}
                  </p>
                </div>
              </div>
            )}

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
