// components/dashboard/CaseItem.tsx
'use client'

import {
  AlertCircle,
  Calendar,
  ChevronRight,
  Clock,
  Edit,
  File,
  FileText,
  Gavel,
  Mail,
  MapPin,
  Scale,
  Trash2,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { CaseButton } from '@/components/ui/CaseButton'
import { formatDate } from '@/lib/date'
import { cn } from '@/lib/utils'
import { Case } from '@/types/case'

interface CaseItemProps {
  caseItem: Case
}

export const CaseItem = ({ caseItem }: CaseItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className='rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md'>
      <div className='p-6'>
        {/* Main Header */}
        <div className='flex items-start justify-between gap-4'>
          <div className='flex-1'>
            <Link
              href={`/cases/${caseItem._id}`}
              className='group hover:no-underline'
            >
              <h3 className='line-clamp-3 text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600'>
                {caseItem.issueDescription}
              </h3>
            </Link>

            <div className='mt-2 flex flex-wrap gap-2 text-sm text-gray-600'>
              <div className='flex items-center gap-1'>
                <Calendar className='h-4 w-4' />
                <span>{formatDate(caseItem.incidentDate)}</span>
              </div>
              <div className='flex items-center gap-1'>
                <MapPin className='h-4 w-4' />
                <span>{caseItem.zipCode}</span>
              </div>
              {caseItem.jurisdiction && (
                <div className='flex items-center gap-1'>
                  <Scale className='h-4 w-4' />
                  <span>{caseItem.jurisdiction}</span>
                </div>
              )}
            </div>
          </div>

          <CaseButton
            variant='ghost'
            size={'sm'}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
          >
            <ChevronRight
              className={cn(
                'h-5 w-5 transform transition-transform',
                isExpanded && 'rotate-90'
              )}
            />
          </CaseButton>
        </div>

        {/* Quick Facts */}
        <div className='mt-4 grid grid-cols-2 gap-4 text-sm md:grid-cols-4'>
          <div className='flex items-center gap-2'>
            <Users className='h-4 w-4 text-blue-600' />
            <span className='font-medium'>Parties:</span>
            <span className='line-clamp-2 text-gray-600'>
              {caseItem.partiesInvolved}
            </span>
          </div>

          {caseItem.caseClassification && (
            <div className='flex items-center gap-2'>
              <AlertCircle className='h-4 w-4 text-yellow-600' />
              <span className='font-medium'>Classification:</span>
              <span className='line-clamp-1 text-gray-600'>
                {caseItem.caseClassification}
              </span>
            </div>
          )}

          {caseItem.deadlines && caseItem.deadlines.length > 0 && (
            <div className='flex items-center gap-2'>
              <Clock className='h-4 w-4 text-red-600' />
              <span className='font-medium'>Next Deadline:</span>
              <span className='line-clamp-1 text-gray-600'>
                {formatDate(caseItem.deadlines[0])}
              </span>
            </div>
          )}

          <div className='flex items-center gap-2'>
            <FileText className='h-4 w-4 text-green-600' />
            <span className='font-medium'>Documents:</span>
            <span className='line-clamp-1 text-gray-600'>
              {caseItem.documents.length +
                (caseItem.supportingDocumentation?.length || 0)}
            </span>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className='mt-6 border-t border-gray-100 pt-6'>
            {/* Impact Section */}
            <div className='mb-4'>
              <h4 className='mb-2 flex items-center gap-2 font-medium'>
                <AlertCircle className='h-5 w-5 text-purple-600' />
                Case Impact
              </h4>
              <div className='flex flex-wrap gap-2'>
                {caseItem.issueImpact.map((impact, index) => (
                  <span
                    key={index}
                    className='line-clamp-1 rounded-md bg-purple-100 px-2 py-1 text-sm text-purple-800'
                  >
                    {impact}
                  </span>
                ))}
                {caseItem.otherImpact && (
                  <span className='line-clamp-1 rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-800'>
                    {caseItem.otherImpact}
                  </span>
                )}
              </div>
            </div>

            {/* Legal Details */}
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              {caseItem.relevantLaws && caseItem.relevantLaws.length > 0 && (
                <div>
                  <h4 className='mb-2 flex items-center gap-2 font-medium'>
                    <Gavel className='h-5 w-5 text-blue-600' />
                    Relevant Laws
                  </h4>
                  <ul className='list-disc space-y-1 pl-5'>
                    {caseItem.relevantLaws.map((law, index) => (
                      <li
                        key={index}
                        className='line-clamp-2 text-sm text-gray-600'
                      >
                        {law}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {caseItem.recommendations &&
                caseItem.recommendations.length > 0 && (
                  <div>
                    <h4 className='mb-2 flex items-center gap-2 font-medium'>
                      <Scale className='h-5 w-5 text-green-600' />
                      Recommendations
                    </h4>
                    <ul className='list-disc space-y-1 pl-5'>
                      {caseItem.recommendations.map((rec, index) => (
                        <li
                          key={index}
                          className='line-clamp-2 text-sm text-gray-600'
                        >
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            {/* Documents Section */}
            <div className='mt-4'>
              <h4 className='mb-2 flex items-center gap-2 font-medium'>
                <File className='h-5 w-5 text-gray-600' />
                Associated Documents
              </h4>
              <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
                {caseItem.documents
                  .concat(caseItem.supportingDocumentation || [])
                  .map((doc, index) => (
                    <div
                      key={index}
                      className='flex items-center gap-2 rounded bg-gray-50 p-2 text-sm'
                    >
                      <FileText className='h-4 w-4 text-gray-500' />
                      <span className='line-clamp-1'>
                        {doc.substring(doc.lastIndexOf('/') + 1)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className='mt-6 flex gap-3 border-t pt-4'>
              <CaseButton variant='outline' size='sm' asChild>
                <Link href={`/cases/edit/${caseItem._id}`}>
                  <Edit className='mr-2 h-4 w-4' />
                  Edit Case
                </Link>
              </CaseButton>

              {caseItem.draftedCommunication && (
                <CaseButton variant='outline' size='sm' asChild>
                  <Link href={caseItem.draftedCommunication}>
                    <Mail className='mr-2 h-4 w-4' />
                    View Draft
                  </Link>
                </CaseButton>
              )}

              <CaseButton
                variant='destructive'
                size='sm'
                onClick={() => console.log('Delete case', caseItem._id)}
              >
                <Trash2 className='mr-2 h-4 w-4' />
                Delete
              </CaseButton>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className='flex items-center justify-between rounded-b-lg border-t border-gray-100 bg-gray-50 px-6 py-3'>
        <div className='line-clamp-1 text-sm text-gray-500'>
          Created: {formatDate(caseItem.createdAt)}
        </div>
        <div className='line-clamp-1 text-sm text-gray-500'>
          Last updated: {formatDate(caseItem.updatedAt)}
        </div>
      </div>
    </div>
  )
}
