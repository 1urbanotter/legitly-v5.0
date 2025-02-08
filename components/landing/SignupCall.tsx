// components/landing/SignupCall.tsx

import Link from 'next/link'
import React from 'react'

const CallToAction = () => {
  return (
    <section className='bg-navy_blue px-6 py-20 text-white_supreme'>
      <div className='mx-auto max-w-4xl text-center'>
        <h2 className='mb-8 text-5xl font-bold sm:text-4xl'>
          Ready to Get Started?
        </h2>
        <Link
          href='/signup'
          className='bg-navy-blue inline-block rounded-xl border-4 border-neon_blue px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:border-4 hover:border-white hover:bg-almost_red'
        >
          Sign Up for Free
        </Link>
      </div>
    </section>
  )
}

export default CallToAction
