// components/landing/ValueProp.tsx

import React from 'react'

const ValueProposition = () => {
  const values = [
    {
      title: 'Save Time and Money',
      description:
        'Avoid expensive legal fees and hours of research. Get instant answers with Legitly.',
    },
    {
      title: 'Understand Your Rights',
      description:
        'Complex legal jargon broken down into easy-to-understand language.',
    },
    {
      title: 'Make Informed Decisions',
      description:
        'Get personalized recommendations to help you take the right steps.',
    },
    {
      title: 'Secure and Confidential',
      description:
        'Your data and privacy protected with industry-leading security.',
    },
  ]

  return (
    <section className='bg-raisin px-10 py-20'>
      <div className='mx-auto max-w-6xl'>
        <h2 className='mb-12 text-center text-3xl font-bold text-white sm:text-4xl'>
          Why Choose Legitly?
        </h2>
        <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4'>
          {values.map((value, index) => (
            <div
              key={index}
              className='rounded-xl bg-white p-6 shadow-lg transition-shadow duration-200 hover:shadow-xl'
            >
              <h3 className='mb-4 rounded-lg p-4 text-center font-dm-serif text-3xl font-bold text-sky-300'>
                {value.title}
              </h3>
              <p className='text-silver-200 text-center text-xl font-bold leading-relaxed'>
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ValueProposition
