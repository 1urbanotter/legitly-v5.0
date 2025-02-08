// /components/landing/Hero.tsx

import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <header className='rounded-t-3xl bg-navy_blue px-6 pb-20 pt-40 text-white'>
      <div className='mx-auto max-w-4xl text-center'>
        <h1 className='mb-6 text-4xl font-bold leading-tight sm:text-6xl'>
          Your AI-Powered Legal Advisor
        </h1>
        <p className='mx-auto mb-10 max-w-2xl text-lg sm:text-xl'>
          Legitly analyzes your legal situation, helps you understand your
          rights, and provides actionable recommendations in minutes.
        </p>
        <Link
          href='/signup'
          className='inline-block items-center gap-2 rounded-2xl bg-almost_red px-8 py-4 text-2xl font-bold text-white_supreme shadow-md transition-all duration-200 hover:bg-neon_blue hover:text-navy_blue focus:outline-none focus:ring focus:ring-white_supreme'
        >
          Start Your Case Today
        </Link>
      </div>
    </header>
  )
}

export default Hero
