// components/common/SignOutButton.tsx

'use client'

import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

const SignOutButton = () => {
  const router = useRouter()

  const handleLogout = () => {
    deleteCookie('token')
    router.push('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className='border-supreme_white rounded border-2 bg-neon_blue px-4 py-2 font-bold text-navy_blue hover:bg-almost_red'
    >
      Logout
    </button>
  )
}

export default SignOutButton
