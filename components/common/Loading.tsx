// components/common/Loading.tsx

import React from 'react'

const Loading = () => {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='h-16 w-16 animate-spin rounded-full border-t-4 border-blue-500 border-opacity-50'></div>
    </div>
  )
}

export default Loading
