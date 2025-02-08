'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false) // Mock authentication state

  const handleLogout = () => {
    setIsAuthenticated(false) // Clear authentication state (replace with actual logout logic)
  }

  return (
    <nav className='sticky top-0 z-20 w-full border-b border-white_supreme bg-navy_blue shadow-xl dark:border-gray-600'>
      <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4'>
        {/* Logo */}
        <Link
          href='/'
          className='flex items-center font-mono text-3xl font-bold text-white_supreme sm:text-2xl'
        >
          <span className='material-icons mr-2'>balance</span>
          <span>Legitly</span>
        </Link>

        {/* Desktop Menu */}
        <div className='hidden items-center space-x-6 text-lg font-bold md:flex'>
          {!isAuthenticated ? (
            // If NOT logged in, show these links
            <>
              {['About', 'Services', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className='rounded-lg border-2 border-transparent px-4 py-2 transition-all duration-200 hover:border-neon_blue focus:outline-none focus:ring focus:ring-white_supreme'
                >
                  {item}
                </Link>
              ))}
              <Link
                href='/login'
                className='rounded-lg border-2 border-white_supreme px-4 py-3 font-bold text-white_supreme shadow-md transition-all duration-200 hover:bg-neon_blue hover:text-navy_blue focus:outline-none focus:ring focus:ring-white_supreme'
              >
                Login
              </Link>
              <Link
                href='/signup'
                className='flex items-center gap-2 rounded-lg border-2 border-almost_red bg-almost_red px-4 py-3 font-bold text-white_supreme shadow-md transition-all duration-200 hover:border-white_supreme hover:bg-neon_blue hover:text-navy_blue focus:outline-none focus:ring focus:ring-white_supreme'
              >
                Get Started
                <span className='material-icons text-2xl'>chevron_right</span>
              </Link>
            </>
          ) : (
            // If logged in, show Dashboard links
            <>
              {['Dashboard', 'New Case', 'Ask AI'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(' ', '-')}`}
                  className='rounded-lg border-2 border-transparent px-4 py-2 transition-all duration-200 hover:border-neon_blue hover:text-neon_blue'
                >
                  {item}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className='rounded-lg border-2 border-almost_red px-4 py-3 font-bold text-almost_red shadow-md transition-all duration-200 hover:bg-almost_red hover:text-white_supreme focus:outline-none focus:ring focus:ring-almost_red'
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className='focus:outline-none md:hidden'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className='mt-4 flex flex-col items-center space-y-4 text-lg font-bold md:hidden'
          >
            {!isAuthenticated ? (
              // If NOT logged in, show these links
              <>
                {['About', 'Services', 'Contact'].map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className='w-full rounded-lg border border-white_supreme px-4 py-3 text-center transition-all duration-200 hover:bg-white_supreme hover:text-navy_blue focus:ring focus:ring-almost_red'
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
                <Link
                  href='/login'
                  className='w-full rounded-lg border-2 border-white_supreme px-6 py-3 text-center font-bold text-white_supreme shadow-md transition-all duration-200 hover:bg-neon_blue hover:text-navy_blue focus:ring focus:ring-white_supreme'
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href='/signup'
                  className='w-full rounded-lg border-2 border-white_supreme bg-almost_red px-6 py-3 text-center font-bold text-white_supreme shadow-md transition-all duration-200 hover:bg-almost_red-600 focus:ring focus:ring-white_supreme'
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </>
            ) : (
              // If logged in, show Dashboard links
              <>
                {['Dashboard', 'New Case', 'Ask AI'].map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className='w-full rounded-lg border border-white_supreme px-4 py-3 text-center transition-all duration-200 hover:bg-white_supreme hover:text-navy_blue focus:ring focus:ring-almost_red'
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    handleLogout()
                    setIsOpen(false)
                  }}
                  className='w-full rounded-lg border-2 border-almost_red px-6 py-3 text-center font-bold text-almost_red shadow-md transition-all duration-200 hover:bg-almost_red hover:text-white_supreme focus:ring focus:ring-almost_red'
                >
                  Logout
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
