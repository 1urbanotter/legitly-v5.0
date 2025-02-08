import React from 'react'

import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'
import FeaturesOverview from '@/components/landing/Features'
import Hero from '@/components/landing/Hero'
import CallToAction from '@/components/landing/SignupCall'
import ValueProposition from '@/components/landing/ValueProp'

const HomePage = () => {
  return (
    <div className='font-poppins mx-10 mt-6 min-h-screen max-w-7xl bg-white'>
      <Hero />
      <ValueProposition />
      <FeaturesOverview />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default HomePage
