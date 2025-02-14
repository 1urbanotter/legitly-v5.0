// app/page.tsx

import React from 'react'

import Footer from '@/components/common/Footer'
import FeaturesOverview from '@/components/landing/Features'
import Hero from '@/components/landing/Hero'
import CallToAction from '@/components/landing/SignupCTA'
import ValueProposition from '@/components/landing/ValueProp'

const HomePage = () => {
  return (
    <div className='bg-silver-800 mx-auto min-h-screen max-w-6xl p-10'>
      <Hero />
      <ValueProposition />
      <FeaturesOverview />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default HomePage
