// lib/auth.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

import { auth, db } from '@/lib/firebase'

export const createUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user

    await setDoc(doc(db, 'users', user.uid), {
      firstName,
      lastName,
      email,
    })

    return { userId: user.uid }
  } catch (error: any) {
    console.error('Error creating user:', error.message)
    // Re-throw the error to be handled in the component
    throw error
  }
}

export const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user

    return { userId: user.uid }
  } catch (error: any) {
    console.error('Error signing in:', error.message)
    throw error
  }
}

export const signOutUser = async () => {
  try {
    await signOut(auth)
  } catch (error: any) {
    console.error('Error signing out:', error.message)
    throw error
  }
}

export const getUserData = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      return userSnap.data()
    } else {
      console.log('No such document!')
      return null
    }
  } catch (error: any) {
    console.error('Error getting user data:', error.message)
    throw error
  }
}
