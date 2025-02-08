// /components/dashboard/CaseStats.tsx

import { AlertCircle, CheckCircle, Clock, Folder } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  trend?: string
  icon: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error'
}

const StatCard = ({
  title,
  value,
  trend,
  icon,
  variant = 'default',
}: StatCardProps) => {
  const variantClasses = {
    default: 'bg-blue-50 text-blue-800',
    success: 'bg-green-50 text-green-800',
    warning: 'bg-yellow-50 text-yellow-800',
    error: 'bg-red-50 text-red-800',
  }

  return (
    <div className={`rounded-lg p-4 ${variantClasses[variant]}`}>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm font-medium'>{title}</p>
          <p className='mt-1 text-2xl font-semibold'>{value}</p>
          {trend && <span className='text-sm'>{trend}</span>}
        </div>
        <div className='rounded-full bg-white p-2'>{icon}</div>
      </div>
    </div>
  )
}

export const CaseStats = () => {
  // In real implementation, fetch these stats from your API
  const stats: StatCardProps[] = [
    {
      title: 'Total Cases',
      value: '24',
      trend: '+12%',
      icon: <Folder className='h-5 w-5' />,
    },
    {
      title: 'Pending Actions',
      value: '3',
      trend: 'Urgent',
      icon: <AlertCircle className='h-5 w-5' />,
      variant: 'warning',
    },
    {
      title: 'Completed',
      value: '18',
      trend: '75%',
      icon: <CheckCircle className='h-5 w-5' />,
      variant: 'success',
    },
    {
      title: 'Overdue',
      value: '2',
      trend: '-2 days',
      icon: <Clock className='h-5 w-5' />,
      variant: 'error',
    },
  ]

  return (
    <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}
