// /components/dashboard/QuickActionsPanel.tsx

import { CaseButton } from '@/components/ui/CaseButton'

export const QuickActionsPanel = ({ userId }: { userId: string }) => (
  <div className='rounded-lg bg-white p-6 shadow-sm'>
    <h3 className='mb-4 text-lg font-semibold'>Quick Actions</h3>
    <div className='space-y-2'>
      <CaseButton variant='ghost' className='w-full justify-start' asChild>
        <a href='/cases/new'>New Case</a>
      </CaseButton>
      <CaseButton variant='ghost' className='w-full justify-start' asChild>
        <a href='/ai-analysis'>AI Analysis</a>
      </CaseButton>
      <CaseButton variant='ghost' className='w-full justify-start' asChild>
        <a href='/settings'>Settings</a>
      </CaseButton>
    </div>
  </div>
)
