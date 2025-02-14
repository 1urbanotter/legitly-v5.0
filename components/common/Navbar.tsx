'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState, useMemo } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false) // Mock authentication state

  const handleLogout = () => {
    setIsAuthenticated(false) // Clear authentication state (replace with actual logout logic)
    setIsOpen(false) // Close menu on logout
  }

  // Define all nav links in one place, then filter by auth state
  const allNavLinks = useMemo(
    () => ({
      unauthenticated: ['About', 'Services', 'Contact'],
      authenticated: ['Dashboard', 'New Case', 'Ask AI'],
    }),
    []
  )

  const navLinks = useMemo(
    () =>
      isAuthenticated ? allNavLinks.authenticated : allNavLinks.unauthenticated,
    [isAuthenticated, allNavLinks]
  )

  // Memoize the menu items to avoid re-rendering unless dependencies change
  const mobileMenuItems = useMemo(
    () =>
      navLinks.map((item) => (
        <Link
          key={item}
          href={`/${item.toLowerCase().replace(' ', '-')}`}
          className='block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-sky-700 hover:text-white'
          onClick={() => setIsOpen(false)}
        >
          {item}
        </Link>
      )),
    [navLinks]
  )

  return (
    <nav className='bg-raisin-400 z-90 shadow-raisin-700 sticky top-0 shadow-lg dark:bg-gray-800'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo */}
          <Link
            href='/'
            className='flex items-center font-dm-serif text-3xl font-bold text-white hover:text-gray-200'
          >
            <span className='material-icons mr-2'>balance</span>
            <span>Legitly</span>
          </Link>

          {/* Desktop Menu */}
          <div className='hidden md:flex md:items-center md:space-x-4'>
            {navLinks.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(' ', '-')}`}
                className='rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-sky-700 hover:text-white'
              >
                {item}
              </Link>
            ))}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className='rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600'
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href='/login'
                  className='text-silver border-silver hover:bg-silver hover:text-space rounded-lg border-2 bg-transparent px-6 py-2 font-dm-serif text-lg'
                >
                  Login
                </Link>
                <Link
                  href='/signup'
                  className='text-raisin bg-sky border-silver block rounded-md border-2 px-6 py-2 font-dm-serif font-bold hover:bg-sky-700 focus:ring-sky-500 active:bg-sky-800 sm:text-lg'
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className='focus:outline-none md:hidden'
            onClick={() => setIsOpen(!isOpen)}
            aria-label='Toggle menu'
          >
            {isOpen ? (
              <X size={28} className='text-white' />
            ) : (
              <Menu size={28} className='text-white' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='md:hidden'
          >
            <div className='space-y-1 px-2 pb-3 pt-2 sm:px-3'>
              {mobileMenuItems}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className='block w-full rounded-md bg-red-500 px-3 py-2 text-base font-medium text-white hover:bg-red-600'
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href='/login'
                    className='ext-silver border-silver hover:bg-silver hover:text-space rounded-lg border-2 bg-transparent px-6 py-2 font-dm-serif text-lg'
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href='/signup'
                    className='text-space block rounded-lg border-2 border-white bg-sky-600 px-6 py-2 font-dm-serif font-bold hover:bg-sky-700 focus:ring-sky-500 active:bg-sky-800 sm:text-lg'
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
