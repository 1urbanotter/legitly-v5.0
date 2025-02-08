// components/landing/Features.tsx

import React from 'react'

const FeaturesOverview = () => {
  return (
    <section className='bg-gray-100 px-6 py-16'>
      <div className='container mx-auto'>
        <h2 className='mb-8 text-center text-3xl font-bold text-gray-800 sm:text-4xl'>
          Key Features
        </h2>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          <div className='rounded-lg bg-white p-6 shadow-md'>
            <h3 className='mb-2 text-xl font-bold text-gray-700'>
              AI-Powered Case Analysis
            </h3>
            <p className='text-gray-600'>
              Our advanced AI algorithms analyze your case details to provide
              accurate insights.
            </p>
          </div>
          <div className='rounded-lg bg-white p-6 shadow-md'>
            <h3 className='mb-2 text-xl font-bold text-gray-700'>
              Personalized Recommendations
            </h3>
            <p className='text-gray-600'>
              Get tailored advice based on your specific situation and
              jurisdiction.
            </p>
          </div>
          <div className='rounded-lg bg-white p-6 shadow-md'>
            <h3 className='mb-2 text-xl font-bold text-gray-700'>
              Secure Document Upload
            </h3>
            <p className='text-gray-600'>
              Safely upload and analyze your legal documents with our secure
              platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesOverview
