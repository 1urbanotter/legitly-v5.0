// /components/common/EmptyState.tsx

export const EmptyState = ({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: React.ReactNode
}) => (
  <div className='py-12 text-center'>
    <div className='mx-auto mb-4 h-24 w-24 text-white' aria-hidden='true'>
      <svg
        className='h-full w-full'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
        />
      </svg>
    </div>
    <h3 className='mb-2 font-dm-serif text-2xl font-semibold text-white'>
      {title}
    </h3>
    <p className='text-sky mb-4 text-lg'>{description}</p>
    {action}
  </div>
)
