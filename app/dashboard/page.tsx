// app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, db } from '@/lib/firebase'
import { getUserData } from '@/lib/auth'
import Loading from '@/components/common/Loading'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { CaseList } from '@/components/dashboard/CaseList'

const DashboardPage = () => {
  const router = useRouter()
  const [user, loading, error] = useAuthState(auth)
  const [userData, setUserData] = useState<any>(null) // Type as needed
  const [firebaseToken, setFirebaseToken] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const data = await getUserData(user.uid)
          setUserData(data)
        } catch (err) {
          console.error('Error fetching user data:', err)
        }
      }
    }

    fetchUserData()
  }, [user])

  useEffect(() => {
    const getAuthToken = async () => {
      if (user) {
        try {
          const token = await user.getIdToken(true)
          setFirebaseToken(token)
        } catch (error) {
          console.error('Error getting Firebase token:', error)
        }
      }
    }
    getAuthToken()
  }, [user])

  if (loading) {
    return <Loading />
  }

  if (error) {
    console.error('Firebase Auth Error:', error)
    return <div>Error: {error.message}</div>
  }

  if (!user) {
    router.push('/login')
    return null
  }

  return (
    <div className='min-h-screen bg-sky-700'>
      <div className='container mx-auto py-6'>
        {userData ? (
          <DashboardHeader user={userData} />
        ) : (
          <div>Loading user data...</div>
        )}
        {userData && firebaseToken ? (
          <CaseList userId={user.uid} firebaseToken={firebaseToken} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
