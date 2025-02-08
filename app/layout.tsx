import './globals.css'

import type { Metadata } from 'next'
import { Outfit, DM_Serif_Text } from 'next/font/google'

import Navbar from '@/components/common/Navbar'
import { Providers } from '@/components/providers/Providers'

// Import fonts
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-outfit',
})
const dmSerifText = DM_Serif_Text({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dm-serif',
})

export const metadata: Metadata = {
  title: 'Legitly V5',
  description: 'Your AI-Powered Legal Assistant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={`${outfit.variable} ${dmSerifText.variable}`}>
      <head>
        {/* Material Icons for UI */}
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
        />
      </head>

      <body className='font-sans'>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
