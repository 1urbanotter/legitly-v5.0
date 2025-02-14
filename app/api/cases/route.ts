// app/api/cases/route.ts
import { NextRequest, NextResponse } from 'next/server'
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { adminAuth } from '@/lib/firebaseAdmin' // Import Firebase Admin Auth

export async function POST(req: NextRequest) {
  try {
    console.log('POST /api/cases called')

    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Missing or invalid Authorization header')
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const token = authHeader.split(' ')[1]
    console.log('Token:', token)

    // Verify the JWT using Firebase Admin SDK
    let decodedToken
    try {
      decodedToken = await adminAuth.verifyIdToken(token)
      console.log('Decoded token:', decodedToken)
    } catch (error: any) {
      console.error('Error verifying token:', error) // Log the entire error object
      console.error('Error verifying token:', error.message)
      return NextResponse.json(
        { message: 'Unauthorized', error: error.message },
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const userId = decodedToken.uid // Get the user ID from the decoded token
    console.log('User ID:', userId)

    const formData = await req.formData()
    const issueDescription = formData.get('issueDescription') as string
    const partiesInvolved = formData.get('partiesInvolved') as string
    const incidentDate = formData.get('incidentDate') as string
    const zipCode = formData.get('zipCode') as string
    const desiredResolution = formData.get('desiredResolution') as string
    const issueImpact = formData.getAll('issueImpact') as string[]
    const otherImpact = formData.get('otherImpact') as string | undefined

    console.log('Form data:', {
      issueDescription,
      partiesInvolved,
      incidentDate,
      zipCode,
      desiredResolution,
      issueImpact,
      otherImpact,
    })

    const caseData = {
      userId: userId, // Use the user ID from the decoded token
      issueDescription,
      partiesInvolved,
      incidentDate,
      zipCode,
      desiredResolution,
      issueImpact,
      otherImpact,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const casesCollection = collection(db, 'cases')
    console.log('Adding case to Firestore')
    try {
      console.log('Case data:', caseData) // Log the data being written to Firestore
      const docRef = await addDoc(casesCollection, caseData)
      console.log('Case added successfully with ID:', docRef.id)
      return NextResponse.json(
        {
          message: 'Case created successfully',
          case: { id: docRef.id, ...caseData },
        },
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      )
    } catch (dbError: any) {
      console.error('Error adding case to Firestore:', dbError)
      return NextResponse.json(
        { message: 'Database error', error: dbError.message },
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }
  } catch (error: any) {
    console.error('Firebase case creation error:', error)
    return NextResponse.json(
      { message: error.message },
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    console.log('GET /api/cases called')

    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Missing or invalid Authorization header')
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const token = authHeader.split(' ')[1]
    console.log('Token:', token)

    // Verify the JWT using Firebase Admin SDK
    let decodedToken
    try {
      decodedToken = await adminAuth.verifyIdToken(token)
      console.log('Decoded token:', decodedToken)
    } catch (error: any) {
      console.error('Error verifying token:', error) // Log the entire error object
      console.error('Error verifying token:', error.message)
      return NextResponse.json(
        { message: 'Unauthorized', error: error.message },
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const userId = decodedToken.uid // Get the user ID from the decoded token
    console.log('User ID:', userId)

    const casesCollection = collection(db, 'cases')
    const q = query(casesCollection, where('userId', '==', userId))
    const querySnapshot = await getDocs(q)

    const cases = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json(cases, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }) // Return the array directly
  } catch (error: any) {
    console.error('Firebase case fetching error:', error)
    return NextResponse.json(
      { message: error.message },
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
