// /components/landing/Hero.tsx

import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <header className='bg-sky text-space rounded-t-3xl px-6 pb-12 pt-20'>
      <div className='mx-auto max-w-4xl text-center'>
        <h1 className='mb-6 font-dm-serif text-4xl font-bold leading-tight sm:text-6xl'>
          Your AI-Powered Legal Advisor
        </h1>
        <p className='text-space-300 mx-auto mb-10 max-w-2xl text-lg font-bold leading-relaxed sm:text-xl'>
          Legitly analyzes your legal situation, helps you understand your
          rights, and provides actionable recommendations in minutes.
        </p>
        <Link
          href='/signup'
          className='bg-cement-200 items-center gap-2 rounded-2xl border-4 border-white px-8 py-4 font-dm-serif text-2xl font-bold text-white shadow-md transition-all duration-200 hover:bg-sky-200 hover:text-white focus:outline-none focus:ring focus:ring-white'
        >
          Start Your Case Today
        </Link>
      </div>
    </header>
  )
}

export default Hero
