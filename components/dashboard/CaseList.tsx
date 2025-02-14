// app/components/dashboard/CaseList.tsx
'use client'

import { PlusCircle } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

import { EmptyState } from '@/components/common/EmptyState'
import { CaseItem } from '@/components/dashboard/CaseItem'
import { CaseButton } from '@/components/ui/CaseButton'
import { Select } from '@/components/ui/Select'
import { Case } from '@/types/case'

interface CaseListProps {
  userId: string
  firebaseToken: string
}

const statusOptions = [
  { value: 'all', label: 'All Cases' },
  { value: 'open', label: 'Open' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'closed', label: 'Closed' },
]

const sortOptions = [
  { value: 'createdAt', label: 'Date Created' },
  { value: 'priority', label: 'Priority' },
  { value: 'dueDate', label: 'Due Date' },
]

export const CaseList = ({ userId, firebaseToken }: CaseListProps) => {
  const [cases, setCases] = useState<Case[]>([])
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('createdAt')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch(`/api/cases?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${firebaseToken}`,
          },
        })
        if (!response.ok) {
          throw new Error(
            `Failed to fetch cases: ${response.status} ${response.statusText}`
          )
        }
        const data: Case[] = await response.json() // Directly assign the response to cases
        setCases(data)
      } catch (error) {
        console.error('Failed to fetch cases:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCases()
  }, [userId, firebaseToken])

  const filteredCases = useMemo(() => {
    return cases
      .filter(
        (caseItem) => filterStatus === 'all' || caseItem.status === filterStatus
      )
      .sort((a, b) => {
        if (sortBy === 'createdAt')
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        if (sortBy === 'priority') return b.priority - a.priority
        //@ts-expect-error
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      })
  }, [cases, filterStatus, sortBy])

  if (loading) {
    return <div className='animate-pulse space-y-4'>Loading cases...</div>
  }

  return (
    <div className='bg-raisin-400 rounded-lg p-6 shadow-sm'>
      <div className='mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
        <div>
          <h2 className='font-dm-serif text-3xl font-bold text-white'>
            Case Dashboard
          </h2>
          <p className='text-sky mt-1 text-lg font-bold'>
            {filteredCases.length} cases found
          </p>
        </div>

        <div className='flex w-full flex-wrap gap-4 sm:w-auto'>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={statusOptions}
            aria-label='Filter cases by status'
          />

          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={sortOptions}
            aria-label='Sort cases by'
          />
        </div>
      </div>

      {filteredCases.length > 0 ? (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {filteredCases.map((caseItem) => (
            <CaseItem key={caseItem.id} caseItem={caseItem} />
          ))}
        </div>
      ) : (
        <EmptyState
          title='No Cases Found'
          description='Get started by creating a new case'
          action={
            <Link href='/case/new' passHref>
              <CaseButton
                variant='destructive'
                size='lg'
                aria-label='Create new case'
                icon={<PlusCircle className='h-5 w-5' />}
              >
                Create Case
              </CaseButton>
            </Link>
          }
        />
      )}
    </div>
  )
}

export default CaseList
