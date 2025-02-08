// components/CaseItem.tsx

import { formatDistanceToNowStrict } from 'date-fns/formatDistanceToNowStrict'
import Link from 'next/link'

import { Case } from '@/types/case'

interface CaseItemProps {
  caseItem: Case
}

const CaseItem = ({ caseItem }: CaseItemProps) => {
  const formattedDate = caseItem.incidentDate
    ? formatDistanceToNowStrict(new Date(caseItem.incidentDate), {
        addSuffix: true,
      })
    : 'Date not specified'

  return (
    <li className='rounded-lg bg-white shadow-sm transition-all duration-200 hover:shadow-md'>
      <Link href={`/case/${caseItem._id}`} className='block p-6'>
        <div className='flex items-start justify-between gap-4'>
          <div className='min-w-0 flex-1'>
            <h3 className='mb-2 truncate text-lg font-semibold text-gray-800'>
              {caseItem.issueDescription}
            </h3>
            <div className='grid grid-cols-1 gap-y-2 text-sm text-gray-600'>
              <div>
                <span className='font-medium'>Incident Date:</span>{' '}
                {formattedDate}
              </div>
              <div>
                <span className='font-medium'>Parties Involved:</span>{' '}
                {caseItem.partiesInvolved}
              </div>
            </div>
          </div>
        </div>
        <div className='mt-4 flex items-center justify-between text-sm'>
          <span className='text-gray-500'>
            Created{' '}
            {formatDistanceToNowStrict(new Date(caseItem.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      </Link>
    </li>
  )
}

export default CaseItem
