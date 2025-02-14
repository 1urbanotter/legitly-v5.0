// app/api/cases/[caseId]/route.tsx
import { NextRequest, NextResponse } from 'next/server'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function GET(
  req: NextRequest,
  { params }: { params: { caseId: string } }
) {
  try {
    const caseId = params.caseId
    const caseRef = doc(db, 'cases', caseId)
    const caseSnapshot = await getDoc(caseRef)

    if (!caseSnapshot.exists()) {
      return NextResponse.json({ message: 'Case not found' }, { status: 404 })
    }

    const caseData = {
      id: caseSnapshot.id,
      ...caseSnapshot.data(),
    }

    return NextResponse.json({ case: caseData }, { status: 200 })
  } catch (error: any) {
    console.error('Firebase case fetching error:', error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
