// components/landing/Features.tsx

import React from 'react'

const FeaturesOverview = () => {
  return (
    <section className='bg-cement-100 px-10 py-16'>
      <div className='container mx-auto max-w-6xl'>
        <h2 className='mb-8 text-center font-dm-serif text-5xl font-bold text-sky-600 sm:text-5xl'>
          Key Features
        </h2>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          <div className='rounded-lg bg-sky-200 p-6 shadow-md'>
            <h3 className='mb-2 font-dm-serif text-2xl font-bold text-white'>
              AI-Powered Case Analysis
            </h3>
            <p className='text-space-300 text-xl font-bold leading-relaxed'>
              Our advanced AI algorithms analyze your case details to provide
              accurate insights.
            </p>
          </div>
          <div className='rounded-lg bg-sky-200 p-6 shadow-md'>
            <h3 className='mb-2 font-dm-serif text-2xl font-bold text-white'>
              Personalized Recommendations
            </h3>
            <p className='text-space-300 text-xl font-bold leading-relaxed'>
              Get tailored advice based on your specific situation and
              jurisdiction.
            </p>
          </div>
          <div className='rounded-lg bg-sky-200 p-6 shadow-md'>
            <h3 className='mb-2 font-dm-serif text-2xl font-bold text-white'>
              Secure Document Upload
            </h3>
            <p className='text-space-300 text-xl font-bold leading-relaxed'>
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
